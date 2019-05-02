import { promises } from "fs";
import { resolve, normalize } from "path";
import {
  ServerRequest,
  ServerResponse,
  StaticAssetsConfig,
} from "@server/server";

const statAsync = promises.stat;
const readdirAsync = promises.readdir;

export type HookConfig = StaticAssetsConfig & {};

// prettier-ignore
export const serveStaticHook = async ({
  rootDir,
  urlPrefix,
  gzip = false,
  brotli = false,
  preferBrotli = false,
}: HookConfig) => {
  let encodingEnabled = gzip || brotli;

  let identity = new Map<string, boolean>();
  let gzipped = new Map<string, boolean>();
  let brotlied = new Map<string, boolean>();

  const assetsPublicPaths: string[] = [];
  await recursiveCollect(urlPrefix, rootDir, assetsPublicPaths);
  populateMappings(assetsPublicPaths, identity, gzipped, brotlied);

  return async (req: ServerRequest, res: ServerResponse): Promise<void> => {
    if (!req.raw.url || !req.raw.url.startsWith(urlPrefix)) {
      return;
    }

    const acceptedEncs = new AcceptEncoding(req.headers["accept-encoding"]);
    const acceptEncodedOnly = acceptedEncs.encodedContentOnly();
    const acceptOriginalOnly = acceptedEncs.originalContentOnly();

    if (
      (acceptEncodedOnly && !encodingEnabled) ||
      (acceptOriginalOnly && (
        gzipped.has(req.raw.url) || brotlied.has(req.raw.url)
      ))
    ) {
      res.code(406);
      res.send("Not Acceptable");
      return;
    }

    let assetPath = req.raw.url;

    if (!encodingEnabled || acceptOriginalOnly) {
    }
  };
};

/**
 * Populates/enriches the store by encoding extension. Currently only gz and br.
 * @param list the list to derive data from
 * @param gzip the gzip mappings cache
 * @param brotli the brotli mappings cache
 */
function populateMappings(
  list: string[],
  identity: Map<string, boolean>,
  gzip: Map<string, boolean>,
  brotli: Map<string, boolean>,
): void {
  for (let i = 0, ln = list.length; i < ln; i++) {
    const f = list[i];
    if (f.endsWith(".gz")) gzip.set(f.substr(0, f.length - 3), true);
    else if (f.endsWith(".br")) brotli.set(f.substr(0, f.length - 3), true);
    else identity.set(f, true);
  }
}

/**
 * Recursively walks down a directory tree and populates the list
 * with flattened file paths in the format `{urlPrefix}/{subdir}/{file}`
 * @param urlPrefix the url path to prefix to each returned path
 * @param dir the target directory
 * @param list the list to populate the flattened paths with
 * @param subDir this is for recursive usage only, do not specify
 */
async function recursiveCollect(
  urlPrefix: string,
  dir: string,
  list: string[],
  subDir: string = "",
): Promise<void> {
  const ff = await readdirAsync(dir);
  await Promise.all(
    ff.map(async f => {
      const abs = resolve(dir, f);
      const stat = await statAsync(abs);

      if (stat.isFile()) {
        list.push(normalize(`${urlPrefix}/${subDir}/${f}`));
      }

      if (stat.isDirectory()) {
        return await recursiveCollect(urlPrefix, abs, list, f);
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
   * returns the preferred encoding.
   */
  public preferred(): EncType {
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
