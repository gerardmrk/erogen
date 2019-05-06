import { normalize } from "path";
import { promises as fsPromises } from "fs";
import { TextEncoder, TextDecoder } from "util";

import i18next from "i18next";
import I18nextBackend from "i18next-node-fs-backend";

import PurgeCSS from "purgecss";

import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import { Provider as StoreProvider } from "react-redux";
import {
  I18nextProvider as I18nProvider,
  initReactI18next,
} from "react-i18next";
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

const statAsync = fsPromises.stat;
const mkdirAsync = fsPromises.mkdir;
const writeFileAsync = fsPromises.writeFile;

/**
 * Renderer cache. values must be encoded
 */
export type RendererCache = Map<string, Uint8Array>;

/**
 * prerender settings
 */
export type PrerenderSettings = {
  // whether to prerender all routes. If false, will only prerender routes
  // that have been explicitly marked as `prerendered: true`.
  all?: boolean;
  // the language in locale code to prerender the route with.
  lang: string;
  // Only prerender proto data (to cache). If true, `writeToDisk` option will be
  // and an error thrown if caching is not enabled for the renderer.
  protoOnly?: boolean;
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
};

/**
 * Init Params
 */
export type InitParams = {
  // prerendering settings.
  prerender?: false | PrerenderSettings;
  // enable caching if true. The provided cache(s) is used if one is provided.
  cache?: boolean | { html?: RendererCache; data?: RendererCache };
  // i18n settings
  internationalization: {
    // sets i18next's internal debug option
    debug?: boolean;
    // path to the translations directory.
    // must contain children with path: `/[lang]/[namespace].json`
    translations: string;
  };
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
  private textDecoder: TextDecoder;

  // caches
  private htmlCache: Map<string, Uint8Array> = new Map<string, Uint8Array>();
  private dataCache: Map<string, Uint8Array> = new Map<string, Uint8Array>();

  // core
  private chunkExtractor: ChunkExtractor;
  private i18n: i18next.i18n = i18next.createInstance();

  public constructor({ debug }: RendererConfig) {
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
    this.textDecoder = new TextDecoder();

    this.chunkExtractor = new ChunkExtractor({
      stats: this.moduleStats,
      entrypoints: [this.appEntrypointID],
    });

    if (!!debug) {
      this.debugEnabled = true;
      console.warn("Renderer.debugEnabled", this.debugEnabled);
    }
  }

  private _getStore = async () => {
    const services = new Services();
    const createStore = storeCreator(services);
    const store = createStore();
    return Promise.resolve(store);
  };

  private _getRefreshedI18n = async (lng: string) => {
    const i18n = await this.i18n.cloneInstance({ lng });
    i18n.use(initReactI18next);
    return i18n;
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
    i18n,
    headContext,
    routerContext,
  }: GetAppElementParams) => {
    return Promise.resolve(
      <ConfigProvider config={this.appConfig}>
        <I18nProvider i18n={i18n}>
          <HeadProvider context={headContext}>
            <StoreProvider store={store}>
              <Router location={url} context={routerContext}>
                <ChunkExtractorManager extractor={this.chunkExtractor}>
                  <App />
                </ChunkExtractorManager>
              </Router>
            </StoreProvider>
          </HeadProvider>
        </I18nProvider>
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
   * IMPORTANT: It is required to invoke this method after creating a new
   * renderer instance. This performs the following:
   * - sets up internationalization.
   * - optionally sets up caches for routes.
   * - optionally prerenders routes.
   *
   * Prerendering can also be invoked separately if preferred, but must only
   * be called after initialization.
   *
   * @param param.cache cache settings
   * @param param.prerender prerendering settings
   * @param param.internationalization i18n settings
   */
  public async init({ internationalization, cache, prerender }: InitParams) {
    // caching
    if (!!cache) {
      this.cacheEnabled = true;
      if (typeof cache === "object") {
        this.htmlCache = cache.html || new Map<string, Uint8Array>();
        this.dataCache = cache.data || new Map<string, Uint8Array>();
      } else {
        this.htmlCache = new Map<string, Uint8Array>();
        this.dataCache = new Map<string, Uint8Array>();
      }
    }

    // prerendering

    // prettier-ignore
    if (!!prerender) {
      if (!prerender.writeToDisk && !cache) {
        throw new Error("`prerender.writeToDisk` is required if `cache` is not enabled.");
      }
      if (!prerender.protoOnly && !cache) {
        throw new Error("`cache` must be enabled if `prerender.protoOnly` is true.");
      }
      await this.prerenderRoutes(prerender);
    }

    // i18n
    const { debug, translations } = internationalization;

    const i18n = await i18next.createInstance();
    i18n.use(I18nextBackend);

    await i18n.init({
      debug: !!debug,
      load: "languageOnly",
      whitelist: this.appConfig.supportedLanguages,
      fallbackLng: this.appConfig.defaultLanguage,
      backend: {
        loadPath: `${translations}/{{lng}}/{{ns}}.json`,
      },
    });

    this.i18n = i18n;
  }

  /**
   * Prerenders application routes.
   * @param settings
   */
  public async prerenderRoutes(settings: PrerenderSettings): Promise<void> {
    if (settings.writeToDisk) {
      settings.writeToDisk = normalize(settings.writeToDisk);
      await mkdirIfNotExists(settings.writeToDisk);
    }

    let whitelist: RouteConf[] = [];
    let blacklist: RouteConf[] = [];
    filterPrerender(whitelist, blacklist, routeConfs);

    if (settings.all) {
      whitelist = [...whitelist, ...blacklist];
      blacklist = [...blacklist, ...whitelist];
    }

    if (!settings.protoOnly) {
      // prettier-ignore
      await Promise.all(
        whitelist.map(async (r: RouteConf) => {
          const html = await this.getRouteHTML({
            url: r.path as string,
            lang: settings.lang,
          });

          if (settings.writeToDisk) {
            const prefix = r.path === "/"
              ? "[index]"
              : (r.path as string).replace(/(\/([^/]*))/g, match => `[${match.substr(1).replace(/:(.*)/g, "($1)")}]`);

            await writeFileAsync(
              normalize(`${settings.writeToDisk}/${prefix}.${settings.lang}.html`),
              html,
            );
          }

          if (this.cacheEnabled) {
            this.htmlCache.set(
              `${r.path || r.status}.${settings.lang}`,
              this.textEncoder.encode(html),
            );
          }
        }),
      );
    }

    if (this.cacheEnabled) {
      // prettier-ignore
      await Promise.all(blacklist.map(async (r: RouteConf) => {
        const data = await this.getRouteProto(RendererRequest.encode({
          url: r.path as string,
          lang: settings.lang,
        }).finish());
        this.dataCache.set(`${r.path || r.status}.${settings.lang}`, data);
      }));
    }
  }

  /**
   * Get the full HTML string for this route
   * @param params render params
   */
  public async getRouteHTML(params: RenderParams): Promise<string> {
    const cacheKey = `${params.url}.${params.lang}`;

    if (this.cacheEnabled && this.htmlCache.has(cacheKey)) {
      return this.textDecoder.decode(this.htmlCache.get(cacheKey));
    }

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

    const response = RendererResponse.create(
      await this.getRouteJSON(await RendererRequest.decode(params)),
    );

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
      const i18n = await this._getRefreshedI18n(params.lang);

      const app = await this._getAppElement({
        url: params.url,
        store,
        i18n,
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
      const i18n = await this._getRefreshedI18n(params.lang);

      const app = await this._getAppElement({
        url: params.url,
        store,
        i18n,
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
  i18n: i18next.i18n;
  headContext: HeadContext;
  routerContext: StaticRouterContext;
};

function filterPrerender(
  whitelist: RouteConf[],
  blacklist: RouteConf[],
  routes: RouteConf[],
) {
  routes.forEach(r => {
    if (!r.path) r.path = `/${r.status}`;
    if (r.prerender) whitelist.push(r);
    else blacklist.push(r);
    if (r.routes && r.routes.length > 0) {
      return filterPrerender(whitelist, blacklist, r.routes);
    }
  });
}

async function mkdirIfNotExists(dirname) {
  try {
    const stat = await statAsync(dirname);
    if (!stat.isDirectory()) throw new Error(`${dirname} is not a directory.`);
  } catch (err) {
    if (err && err.code === "ENOENT") {
      await mkdirAsync(dirname);
    } else {
      throw err;
    }
  }
}
