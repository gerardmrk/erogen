import { promises } from "fs";
import { resolve, normalize } from "path";
import { ServerRequest, ServerResponse } from "@server/server";

const statAsync = promises.stat;
const readdirAsync = promises.readdir;

export const appendEncodingExt = async (
  assetsUrlPrefix: string,
  assetsDir: string,
) => {
  const paths = [];

  await recursiveCollect(assetsUrlPrefix, assetsDir, paths);

  const gzip = new Map<string, boolean>();
  const brotli = new Map<string, boolean>();

  populateMappings(paths, gzip, brotli);

  return async (req: ServerRequest, res: ServerResponse): Promise<void> => {
    console.log("HELLO");
  };
};

function populateMappings(
  list: string[],
  gzip: Map<string, boolean>,
  brotli: Map<string, boolean>,
) {
  for (let i = 0, ln = list.length; i < ln; i++) {
    const f = list[i];
    if (f.endsWith(".gz")) gzip.set(f.substr(0, f.length - 3), true);
    if (f.endsWith(".br")) brotli.set(f.substr(0, f.length - 3), true);
  }
}

async function recursiveCollect(
  urlPrefix: string,
  dir: string,
  list: string[],
  subDir: string = "",
) {
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
