import { TextEncoder } from "util";
import { promises as fsPromises } from "fs";

import PurgeCSS from "purgecss";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Provider as StoreProvider } from "react-redux";
import { FilledContext as HeadContext } from "react-helmet-async";
import { HelmetProvider as HeadProvider } from "react-helmet-async";
import { ChunkExtractor, ChunkExtractorManager } from "@loadable/server";
import { StaticRouter as Router, StaticRouterContext } from "react-router";

import { App } from "@client/views/core/App";
import { Services } from "@client/services";
import { storeCreator, Store } from "@client/store";
import { ConfigProvider } from "@client/views/contexts/config";
import { RendererResponse, RendererRequest } from "./proto";
import { RouteConf, routeConfs } from "@client/views/conf.routes";

const writeFileAsync = fsPromises.writeFile;

/**
 * Renderer cache. values must be encoded
 */
export type RendererCache = Map<string, Uint8Array>;

/**
 * prerender params
 */
export type PrerenderRoutesParams = {
  // the language in locale code to prerender the route with.
  lang: string;
  // if provided, will attempt to write the prerendered HTML to disk
  // at the given directory path, with the name format: `[routeName].html`.
  // otherwise the prerendered HTML will be cached instead.
  writeToDisk?: string;
};

/**
 * request input for the renderer's various rendering methods
 */
export type RenderParams = {
  // url of the route.
  url: string;
  // the preferred/requested language.
  lang: string;
};

/**
 * response output for the renderer's various rendering methods
 */
export type RenderResponse = {
  // primary
  lang: string;
  app: string;
  metas: string;
  links: string;
  styles: string;
  scripts: string;
  initialState: string;
  // metadata
  statusCode: number;
  ttr: string;
  redirectTo?: string;
  error?: { message: string; stackTrace?: string };
};

/**
 * Renderer Config
 */
export type RendererConfig = {
  // enable debugging
  debug?: boolean;
  // enable caching if true. The provided cache is used if one is provided.
  cache?: boolean | { html: RendererCache; data: RendererCache };
};

/**
 * Serverside Renderer
 * This class is designed to be used as a singleton for performance reasons.
 * DO NOT create a new instance of this class per request. Study the code below
 * for reasons why.
 */
export class Renderer {
  // flags
  private debugEnabled: boolean = false;
  private cacheEnabled: boolean = false;

  // injected
  private appConfig: AppConfig;
  private moduleStats: AsyncModuleStats;
  private htmlBits: HTMLBits;
  private appEntrypointID: string;

  // helpers
  private textEncoder: TextEncoder;
  private chunkExtractor: ChunkExtractor;

  // caches
  private htmlCache: Map<string, Uint8Array> = new Map<string, Uint8Array>();
  private dataCache: Map<string, Uint8Array> = new Map<string, Uint8Array>();

  public constructor({ debug, cache }: RendererConfig) {
    // Variables on the global object doesn't get garbage-collect, and these
    // ones need to cos they're huge, so create local copies here and delete the
    // original values from global right after. The local copies should now reside
    // in the stack and can be reliably marked as unreachable when the time comes.

    this.appEntrypointID = INJECTED_APP_ENTRY_POINT_ID;
    global["INJECTED_APP_ENTRY_POINT_ID"] = null;

    this.appConfig = JSON.parse(JSON.stringify(INJECTED_APP_CONFIG));
    global["INJECTED_APP_CONFIG"] = null;

    this.moduleStats = JSON.parse(JSON.stringify(INJECTED_ASYNC_MODULE_STATS));
    global["INJECTED_ASYNC_MODULE_STATS"] = null;

    const bits = INJECTED_GENERATED_HTML.split(/(?:{{{[A-Za-z0-9]+}}})/g);
    global["INJECTED_GENERATED_HTML"] = null;

    this.htmlBits = {
      docStart: bits[0],
      postLang: bits[1],
      postMetas: bits[2],
      postLinks: bits[3],
      postStyles: bits[4],
      postApp: bits[5],
      postInitialState: bits[6],
      docEnd: bits[7],
    };

    this.textEncoder = new TextEncoder();

    this.chunkExtractor = new ChunkExtractor({
      stats: this.moduleStats,
      entrypoints: [this.appEntrypointID],
    });

    if (!!debug) {
      this.debugEnabled = true;
      console.warn("Renderer.debugEnabled", this.debugEnabled);
    }

    if (!!cache) {
      this.cacheEnabled = true;
      if (typeof cache === "object") {
        this.htmlCache = !!cache.html ? cache.html : new Map<string, Uint8Array>(); // prettier-ignore
        this.dataCache = !!cache.data ? cache.data : new Map<string, Uint8Array>(); // prettier-ignore
      } else {
        this.htmlCache = new Map<string, Uint8Array>();
        this.dataCache = new Map<string, Uint8Array>();
      }
    }
  }

  private _getStore = async () => {
    const services = new Services();
    const createStore = storeCreator(services);
    const store = createStore();
    return Promise.resolve(store);
  };

  private _extractMetaTags = async (data: HeadContext["helmet"]) => {
    if (!data) return Promise.resolve("");
    let result = "";
    for (let dd = Object.values(data), i = 0, l = dd.length; i < l; i++) {
      result += dd[i].toString();
    }
    return Promise.resolve(result);
  };

  private _replaceScriptAsyncToDefer = async (scriptTags: string) => {
    if (!scriptTags) return Promise.resolve("");
    return Promise.resolve(scriptTags.replace(/\sasync\s/g, " defer "));
  };

  private _stripUnusedCssFromHtml = async (html: string, css: string) => {
    if (!css && !html) return Promise.resolve("");
    const result = new PurgeCSS({
      css: [{ raw: css, extension: "css" }],
      content: [{ raw: html, extension: "html" }],
    }).purge();
    return Promise.resolve(result.reduce((rr, r) => (rr += r.css), ""));
  };

  private _getAppElement = async ({
    url,
    store,
    headContext,
    routerContext,
  }: GetAppElementParams) => {
    return Promise.resolve(
      <ConfigProvider config={this.appConfig}>
        <HeadProvider context={headContext}>
          <StoreProvider store={store}>
            <Router location={url} context={routerContext}>
              <ChunkExtractorManager extractor={this.chunkExtractor}>
                <App />
              </ChunkExtractorManager>
            </Router>
          </StoreProvider>
        </HeadProvider>
      </ConfigProvider>,
    );
  };

  private _createResponseObject = (): RenderResponse => ({
    lang: "",
    app: "",
    metas: "",
    links: "",
    styles: "",
    scripts: "",
    initialState: "",
    statusCode: 200,
    ttr: "",
    redirectTo: undefined,
    error: undefined,
  });

  /**
   * ---------------------------------------------------------------------------
   *    PUBLIC METHODS
   * ---------------------------------------------------------------------------
   */

  /**
   * Prerender all prerender-able routes.
   * @param params the prerender params
   */
  public async prerenderRoutes(params: PrerenderRoutesParams): Promise<void> {
    if (!params.writeToDisk && !this.cacheEnabled) {
      throw new Error("`writeToDisk` is required if caching is not enabled.");
    }

    const whitelist: RouteConf[] = [];
    filterPrerender(whitelist, routeConfs);

    await Promise.all(
      whitelist.map(async (r: RouteConf) => {
        const key = `${r.path}.${params.lang}`;

        const [html, data] = await Promise.all([
          this.getRouteHTML({ url: r.path as string, lang: params.lang }),
          this.getRouteProto(RendererRequest.encode({ url: r.path as string, lang: params.lang }).finish()), // prettier-ignore
        ]);

        if (params.writeToDisk) {
          await writeFileAsync(`${params.writeToDisk}/${key}.html`, html);
        }
        if (this.cacheEnabled) {
          this.htmlCache.set(key, this.textEncoder.encode(html));
          this.dataCache.set(key, data);
        }
      }),
    );
  }

  /**
   * Get the full HTML string for this route
   * @param params render params
   */
  public async getRouteHTML(params: RenderParams): Promise<string> {
    const out = await this.getRouteJSON(params);
    return (
      this.htmlBits.docStart +
      out.lang +
      this.htmlBits.postLang +
      out.metas +
      this.htmlBits.postMetas +
      out.links +
      this.htmlBits.postLinks +
      out.styles +
      this.htmlBits.postStyles +
      out.app +
      this.htmlBits.postApp +
      out.initialState +
      this.htmlBits.postInitialState +
      out.scripts +
      this.htmlBits.docEnd
    );
  }

  /**
   * Get the Protobuf output for this route
   * @param params render params
   */
  public async getRouteProto(params: Uint8Array): Promise<Uint8Array> {
    const timerStart = process.hrtime.bigint();

    const out = await this.getRouteJSON(await RendererRequest.decode(params));

    const response = RendererResponse.create({
      ...out,
      app: this.textEncoder.encode(out.app),
      metas: this.textEncoder.encode(out.metas),
      links: this.textEncoder.encode(out.links),
      styles: this.textEncoder.encode(out.styles),
      scripts: this.textEncoder.encode(out.scripts),
      initialState: this.textEncoder.encode(out.initialState),
    });

    response.ttr = `${process.hrtime.bigint() - timerStart}`;

    return RendererResponse.encode(response).finish();
  }

  /**
   * Get the JSON output for this route
   * @param params render params
   */
  public async getRouteJSON(params: RenderParams): Promise<RenderResponse> {
    const timerStart = process.hrtime.bigint();
    const response = this._createResponseObject();
    const headContext: HeadContext = { helmet: undefined };
    const routerContext: StaticRouterContext = {};

    try {
      const store = await this._getStore();

      const app = await this._getAppElement({
        url: params.url,
        store,
        headContext,
        routerContext,
      });

      if (!!routerContext.url) {
        response.statusCode = 302;
        response.redirectTo = routerContext.url;
        response.ttr = `${process.hrtime.bigint() - timerStart}`;
        return response;
      }

      response.lang = params.lang;

      response.app = ReactDOMServer.renderToString(app);

      response.metas = await this._extractMetaTags(headContext["helmet"]);

      response.links =
        (this.chunkExtractor.getLinkTags() || "") +
        (this.chunkExtractor.getStyleTags() || "");

      response.styles = await this._stripUnusedCssFromHtml(
        response.app,
        await this.chunkExtractor.getCssString(),
      );

      response.initialState = JSON.stringify(store.getState());

      response.scripts = await this._replaceScriptAsyncToDefer(
        await this.chunkExtractor.getScriptTags(),
      );

      response.statusCode = routerContext.statusCode || 200;
      response.ttr = `${process.hrtime.bigint() - timerStart}`;

      return response;
    } catch (err) {
      response.error = {
        message: err.message || "",
        stackTrace: err.stack || "",
      };
      response.statusCode = 500;
      response.ttr = `${process.hrtime.bigint() - timerStart}`;
      return response;
    }
  }

  /**
   * Stream the full HTML for a given route for better TTFB.
   * WIP/INCOMPLETE/BLOCKED, issues:
   * - race condition between react-helmet and react streaming prevents head tags generation.
   * - unable to utilize PurgeCSS which is significant as the full CSS is over 100+kb.
   *
   * @param params The render params.
   * @param response The response as a writable stream.
   * @param meta The returned metadata: statusCode, redirectTo, error.
   */
  public async streamRouteHTML(
    params: RenderParams,
    response: NodeJS.WritableStream,
    meta: Pick<RenderResponse, "statusCode" | "ttr" | "redirectTo" | "error">,
  ): Promise<void> {
    const timerStart = process.hrtime.bigint();
    const headContext: HeadContext = { helmet: undefined };
    const routerContext: StaticRouterContext = {};

    try {
      const store = await this._getStore();

      const app = await this._getAppElement({
        url: params.url,
        store,
        headContext,
        routerContext,
      });

      if (!!routerContext.url) {
        meta.statusCode = 302;
        meta.redirectTo = routerContext.url;
        meta.ttr = `${process.hrtime.bigint() - timerStart}`;
        return;
      }

      const appStream = ReactDOMServer.renderToNodeStream(app);
      response.write(this.htmlBits.docStart);

      response.write(params.lang);
      response.write(this.htmlBits.postLang);

      response.write(await this._extractMetaTags(headContext["helmet"]));
      response.write(this.htmlBits.postMetas);

      response.write(this.chunkExtractor.getLinkTags() || "");
      response.write(this.chunkExtractor.getStyleTags() || "");
      response.write(this.htmlBits.postLinks);

      response.write(await this.chunkExtractor.getCssString());
      response.write(this.htmlBits.postStyles);

      appStream.pipe(
        response,
        { end: false },
      );

      appStream.on("end", async () => {
        response.write(this.htmlBits.postApp);

        response.write(JSON.stringify(store.getState()));
        response.write(this.htmlBits.postInitialState);

        response.write(
          await this._replaceScriptAsyncToDefer(
            await this.chunkExtractor.getScriptTags(),
          ),
        );
        response.write(this.htmlBits.docEnd);
        meta.statusCode = routerContext.statusCode || 200;
        meta.ttr = `${process.hrtime.bigint() - timerStart}`;
        return response.end();
      });
    } catch (err) {
      meta.error = {
        message: err.message || "",
        stackTrace: err.stack || "",
      };
      meta.statusCode = 500;
      meta.ttr = `${process.hrtime.bigint() - timerStart}`;
      return;
    }
  }
}

type HTMLBits = {
  // start of the HTML doc.
  docStart: string;
  // post language injection.
  postLang: string;
  // post meta tags injection.
  postMetas: string;
  // post prefetch or/and preload links injection.
  postLinks: string;
  // post inlined CSS rules injection.
  postStyles: string;
  // post rendered <App/> injection.
  postApp: string;
  // post store's initial state injection.
  postInitialState: string;
  // post script tags injection; end of the HTML doc.
  docEnd: string;
};

type GetAppElementParams = {
  url: string;
  store: Store;
  headContext: HeadContext;
  routerContext: StaticRouterContext;
};

function filterPrerender(whitelist: RouteConf[], routes: RouteConf[]) {
  for (let i = 0, ln = routes.length; i < ln; i++) {
    if (routes[i].prerender && !!routes[i].path) {
      whitelist.push(routes[i]);
    }
    if (!!routes[i].routes) {
      return filterPrerender(whitelist, routes[i].routes as RouteConf[]);
    }
  }
}
