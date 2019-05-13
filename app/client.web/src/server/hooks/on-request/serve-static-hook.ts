/**
 * Everything in this file looks overly-abstracted and unnecessarily complex cos
 * it was written primarily with performance in mind. Notably, wherever possible,
 * derivations and instantiations are done outside the request scope.
 */
import { promises, createReadStream } from "fs";
import { resolve, normalize, extname, basename } from "path";

import mime from "mime";
import { ServerRequest, ServerResponse, StaticAssetsConfig } from "@server/server"; // prettier-ignore

const statAsync = promises.stat;
const readdirAsync = promises.readdir;

export type AssetAttributes = {
  size: number;
  mimetype: string;
  filepath: string;
  encoding: EncType;
  cache?: boolean | number | "immutable";
};

export type HookConfig = StaticAssetsConfig & {};

// prettier-ignore
export const serveStaticHook = async ({
  rootDir,
  urlPrefix,
  gzip = false,
  brotli = false,
  preferBrotli = false,
}: HookConfig) => {
  if (preferBrotli && !brotli) {
    throw new Error('`assets.preferBrotli` cannot be true if `assets.brotli` is false');
  }

  let encodingEnabled = gzip || brotli;
  let urnCache = new Map<string, AssetAttributes>();
  await recursiveCollect(urnCache, urlPrefix, rootDir);


  /**
   * REQUEST SCOPE
   */

  return async (req: ServerRequest, res: ServerResponse): Promise<ServerResponse | void> => {
    if (!req.raw.url || !req.raw.url.startsWith(urlPrefix)) {
      return;
    }

    const acceptedEncs = new AcceptEncoding(
      req.headers["accept-encoding"],
    );

    if (acceptedEncs.encodedContentOnly() && !encodingEnabled) {
      return res.code(406).send();
    }

    let urn = normalize(stripQueryString(req.raw.url));

    const urnWithGz = urn + ".gz";
    const urnWithGzExists = urnCache.has(urnWithGz);
    const acceptsGz = acceptedEncs.accepts("gzip");

    const urnWithBr = urn + ".br";
    const urnWithBrExists = urnCache.has(urnWithBr);
    const acceptsBr = acceptedEncs.accepts("br");

    if (
      !urnCache.has(urn) &&
      !urnWithGzExists &&
      !urnWithBrExists
    ) {
      return res.code(404).send();
    }

    if (!acceptedEncs.originalContentOnly()) {
      if (preferBrotli && acceptsBr && urnWithBrExists) {
        // `preferBrotli` is true, disregard qfactors as long as `br` is
        // specified in the accepts header and the file exists.
        urn = urnWithBr;
      } else {
        // check if prioritized exists.
        const prioritized = acceptedEncs.prioritized();

        if (prioritized === "gzip" && urnWithGzExists) {
          urn = urnWithGz;
        } else if (prioritized === "br" && urnWithBrExists) {
          urn = urnWithBr;
        } else if (acceptsGz && urnWithGzExists) {
          urn = urnWithGz;
        } else if (acceptsBr && urnWithBrExists) {
          urn = urnWithBr;
        }
      }
    }

    const {
      size,
      mimetype,
      filepath,
      encoding
    } = <AssetAttributes>(urnCache.get(urn));

    return res
      .code(200)
      .header("Content-Type", mimetype)
      .header("Content-Length", size)
      .header("Content-Encoding", encoding)
      .header("Vary", "Accept-Encoding")
      .header("Cache-Control", "public, max-age=31536000")
      .send(createReadStream(filepath));
  };
};

/**
 * strip off trailing query string, if any.
 * current implementation feels hacky. need to find another solution.
 */
function stripQueryString(url: string): string {
  return url.split("?")[0];
}

/**
 * poor man's encoding type derivator. this is a naive implementation
 * but works fine for this project's use-case. don't try to reuse this.
 * @param fname filename
 */
function getEncodingType(fname: string): EncType {
  const ext = extname(fname);
  if (ext === ".gz") return "gzip";
  if (ext === ".br") return "br";
  return "identity";
}

/**
 * convenience wrapper around mime pkg to conditionally remove
 * encoding extension if present before calling mime.getType()
 * @param fname filename
 */
function getMimeType(fname: string): string {
  const ext = extname(fname);
  if (ext === ".br" || ext === ".gz") {
    return mime.getType(basename(fname, ext));
  }
  return mime.getType(fname);
}

/**
 * Recursively walks down a directory tree and populates the list
 * with flattened file paths in the format `{urlPrefix}/{subdir}/{file}`
 * @param paths the lookup store to populate the flattened paths with
 * @param urlPrefix the url path to prefix to each returned path
 * @param dir the target directory
 * @param subDir this is for recursive usage only, do not specify
 */
async function recursiveCollect(
  paths: Map<string, AssetAttributes>,
  urlPrefix: string,
  dir: string,
  subDir: string = "",
): Promise<void> {
  const ff = await readdirAsync(dir);
  await Promise.all(
    ff.map(async f => {
      const abs = resolve(dir, f);
      const stat = await statAsync(abs);

      if (stat.isFile()) {
        paths.set(normalize(`${urlPrefix}/${subDir}/${f}`), {
          size: stat.size,
          filepath: abs,
          mimetype: getMimeType(f),
          encoding: getEncodingType(f),
        });
      }

      if (stat.isDirectory()) {
        return await recursiveCollect(paths, urlPrefix, abs, f);
      }
    }),
  );
}

type EncType = "gzip" | "compress" | "deflate" | "br" | "identity" | "*";
type QFactor = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
type ParsedCNHeader = {
  sorted: EncType[];
  qfactors: Map<EncType, QFactor>;
};

export class AcceptEncoding {
  private sorted: EncType[];
  private qfactors: Map<EncType, QFactor>;
  private count: number;

  public constructor(header: string) {
    const { sorted, qfactors } = this.parseHeader(header);
    this.sorted = sorted;
    this.qfactors = qfactors;
    this.count = this.sorted.length;
  }

  /**
   * returns the priority level in the list of accepted encodings.
   * @param enc Encoding
   */
  public getPriorityFor(enc: EncType): [number, number] {
    return [this.sorted.indexOf(enc), this.count];
  }

  /**
   * returns the list of non-zeroed encoding types
   */
  public getAllTypes(): EncType[] {
    return this.sorted;
  }

  /**
   * returns the map of qfactors
   */
  public getAllQFactors(): Map<EncType, QFactor> {
    return this.qfactors;
  }

  /**
   * returns the prioritized/preferred encoding.
   */
  public prioritized(): EncType {
    return this.sorted[0];
  }

  /**
   * determine if the encoding is accepted.
   * @param enc Encoding
   */
  public accepts(enc: EncType): boolean {
    if (this.qfactors.has(enc) && this.qfactors.get(enc) !== 0) {
      return true;
    }
    return this.qfactors.has("*") && this.qfactors.get("*") !== 0;
  }

  /**
   * "If the Accept-Encoding field-value is empty, then only the "identity"
   * encoding is acceptable."
   * 14.3 @ https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
   */
  public originalContentOnly(): boolean {
    return this.sorted.length === 0;
  }

  /**
   * "...specifically refused because the Accept-Encoding field
   * includes identity;q=0", or because the field includes "*;q=0"
   * and does not explicitly include the "identity" content-coding."
   * 14.3 @ https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
   */
  public encodedContentOnly(): boolean {
    const identity = this.qfactors.get("identity");
    return (this.qfactors.get("*") === 0 && !identity) || identity === 0;
  }

  /**
   * Generic parser for content-negotiation (accept-*) headers.
   * E.G. 'en-US,en;q=0.5' = ['en-US', 'en']
   * @param header the HTTP header value
   */
  private parseHeader(header: string): ParsedCNHeader {
    if (!header || header.trim() === "") {
      // "If the request does not include an Accept-Encoding field,
      // and if the "identity" content-coding is unavailable, then
      // content-codings commonly understood by HTTP/1.0 clients (i.e.,
      // "gzip" and "compress") are preferred; some older clients
      // improperly display messages sent with other content-codings.  The
      // server might also make this decision based on information about
      // the particular user-agent or client."
      // 14.3 @ https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html
      return {
        sorted: ["gzip", "compress"],
        qfactors: new Map<EncType, QFactor>([["gzip", 0.2], ["compress", 0.1]]),
      };
    }

    // this func heavily mutates for performance reasons;
    // rather than creating a temporary array to store intermediate values, just
    // reassign to the existing one.

    let tokens = header.replace(/\s/g, "").split(",");
    for (let i = 0, l = tokens.length; i < l; i++) {
      // @ts-ignore
      tokens[i] = tokens[i].split(";q=");
      // @ts-ignore
      tokens[i][1] = +tokens[i][1] || 1;
    }
    // @ts-ignore
    tokens.sort((a, b) => b[1] - a[1]);
    return {
      // @ts-ignore
      sorted: tokens.filter(t => t[1] !== 0).map(t => t[0]),
      // @ts-ignore
      qfactors: new Map(tokens),
    };
  }
}
