/* eslint-env node */
/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const Fiber = require("fibers");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HardSourcePlugin = require("hard-source-webpack-plugin");
const CleanBuildPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunksPlugin = require("mini-css-extract-plugin");
const CommonJSTreeShakePlugin = require("webpack-common-shake").Plugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressiveWebAppPlugin = require("webapp-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlScriptExtPlugin = require("script-ext-html-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader"); // prettier-ignore
const settingsBuilder = require("./webpack.settings");
const { getAsyncModuleStats, getGeneratedHTML } = require("./webpack.helpers");
const { paths } = require("./shared.paths");

const getSettings = settingsBuilder(paths.appDir);

// prettier-ignore
module.exports = async (args) => {
    const settings = getSettings(args);

    console.info("BUILD SETTINGS:");
    for (const [k, v] of Object.entries(settings)) {
      console.info(`[${k}] ${v}`);
    }

    const {
      // user provided
      mode,
      source,
      // convenience flags
      devMode,
      prodMode,
      clientBuild,
      rendererBuild,
      // derived
      appConfig,
      appEntrypointID,
      appMountPointID,
      enableSourceMap,
    } = settings;

    let generatedHTML;
    let asyncModuleStats;
    if (rendererBuild) {
      generatedHTML = await getGeneratedHTML(paths.clientBuild);
      asyncModuleStats = await getAsyncModuleStats(paths.clientBuild);
    }

    // base config
    const config = {
        context: paths.appDir,

        mode: mode,

        target: clientBuild ? "web" : "node",

        entry: {
          // resolved below
        },

        resolve: {
            enforceExtension: false,
            mainFields: ["module", "main", "browser"],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", "scss"],
            alias: {
                // source code
                "@client": paths.clientSrc,
                "@renderer": paths.rendererSrc,
                // route config
                "@routeConfig": `${paths.source}/route-config.json`,
                // semantic ui theming path resolution
                "../../theme.config$": `${paths.clientSrc}/views/theme/theme.config`,
            },
            plugins: [
                new TsConfigPathsPlugin({
                    configFileName: `${paths.appDir}/tsconfig.${source}.json`
                }),
            ]
        },

        stats: {
            modules: false,
            children: false,
            cached: false,
            assetsSort: "chunks",
            // tone down information in console
            excludeAssets: [
                /^icons\//,
                /\.map$/,
                /\.br$/,
                /\.gz$/,
                /\.LICENSE$/,
                rendererBuild && /^client\//
            ].filter(x => !!x),
            warningsFilter: [
                // purgecss pkg has a dynamic require statement for loading
                // a config file at class instantiation. build is not affected.
                /\/node_modules\/purgecss\/lib\/purgecss\.es\.js/
            ],
        },

        devtool: devMode
            ? "cheap-module-eval-source-map"
            : enableSourceMap
                ? "source-map"
                : false,

        devServer: {
            hot: true,
            port: 4200,
            host: "127.0.0.1",
            publicPath: "/",
            contentBase: "/assets/",
            historyApiFallback: true,
            watchOptions: { poll: true },
            stats: "errors-only",
        },

        optimization: {
            sideEffects: true,
            runtimeChunk: rendererBuild ? undefined : "single",
            splitChunks: {
                cacheGroups: {
                    styles: {
                        name: "styles",
                        test: /\.css$/,
                        chunks: "all",
                        enforce: true,
                    },
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        // maxSize: 80000,
                    }
                }
            },
            minimizer: [
                new TerserPlugin({
                    cache: `${paths.cacheDir}/plugin.terser@${source}.${mode}`,
                    parallel: true,
                    exclude: [/dist/],
                    extractComments: true,
                    sourceMap: enableSourceMap,
                    terserOptions: {
                        output: null,
                        ie8: false,
                        sourceMap: enableSourceMap,
                        compress: {
                            passes: 1,
                            keep_fnames: false,
                            keep_classnames: false,
                            keep_fargs: false,
                        },
                        mangle: {
                            keep_fnames: false,
                            keep_classnames: false,
                        }
                    }
                }),
                new OptimizeCssAssetsPlugin({
                  canPrint: true,
                  assetNameRegExp: /\.css$/g,
                  cssProcessorPluginOptions: {
                      preset: ["default", {
                          discardComments: { removeAll: true },
                      }],
                  }
              }),
            ].filter(x => !!x)
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: [/dist/, /node_modules/],
                    use: [{
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            useBabel: true,
                            cacheDirectory: `${paths.cacheDir}/loader.atl@${source}.${mode}`,
                            errorsAsWarnings: true,
                            transpileOnly: clientBuild,
                            useTranspileModule: clientBuild,
                            forceIsolatedModules: clientBuild,
                            configFileName: `${paths.appDir}/tsconfig.${source}.json`,
                            reportFiles: ["src/**/*.{ts,tsx}"],
                            babelCore: "@babel/core",
                            babelOptions: {
                              babelrc: false,
                              sourceMap: enableSourceMap,
                              presets: [
                                  ["@babel/preset-env", {
                                      modules: false,
                                      loose: true,
                                      useBuiltIns: "usage",
                                      corejs: { version: 3 },
                                      targets: clientBuild
                                          ? { browsers: ["last 2 versions", "not dead", "> 0.5%", "not ie < 11"] }
                                          : { node: "current" }
                                  }],
                                  "@babel/preset-react",
                              ],
                              plugins: [
                                  "@loadable/babel-plugin",
                                  "@babel/plugin-syntax-dynamic-import",
                                  ["@babel/plugin-proposal-class-properties", { loose: true }],
                                  ["@babel/plugin-transform-runtime"],
                                  ["lodash", { id: "lodash-compat" }],
                                  ["transform-imports", {
                                      lodash: { transform: "lodash/${member}",
                                      preventFullImport: true }
                                  }],
                                  prodMode && "transform-react-remove-prop-types",
                                  rendererBuild && ["css-modules-transform", {
                                      extensions: [".css", ".scss"],
                                      generateScopedName: "[hash:base64:7]"
                                  }],
                                  "react-hot-loader/babel"
                              ].filter(x => !!x),
                           }
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    enforce: 'pre',
                    use: ["source-map-loader"],
                },
                {
                    test:  /\.(sa|sc|c)ss$/,
                    exclude: [/dist/, /node_modules/],
                    use: [
                        { 
                            loader: ExtractCssChunksPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: devMode,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: enableSourceMap,
                                modules: true,
                                importLoaders: 1,
                                camelCase: true,
                                localIdentName: devMode ? "[name]_[local]_[hash:base64:7]" : "[hash:base64:7]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: enableSourceMap,
                                plugins: () => [require("autoprefixer")()]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: enableSourceMap,
                                fiber: Fiber,
                                implementation: require("sass")
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.less$/,
                    exclude: [/dist/, /node_modules\/(?!(semantic-ui-less\/(themes|definitions))\/).*/],
                    use: [
                        { 
                            loader: ExtractCssChunksPlugin.loader,
                            options: {
                                hmr: devMode,
                                reloadAll: devMode,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: enableSourceMap,
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: enableSourceMap,
                                strictMath: false,
                                noIeCompat: true
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                    exclude: [/dist/, /node_modules\/(?!(semantic-ui-less\/themes)\/).*/],
                    oneOf: [
                        {
                            loader: "file-loader",
                            options: {
                                emitFile: clientBuild,
                                name: devMode ? "images/[name].[ext]" : "images/[name].[hash].[ext]"
                            }
                        },
                        {
                            use: [
                                devMode && {
                                    loader: "file-loader",
                                    options: {
                                        name: "images/[name].[ext]",
                                        emitFile: clientBuild
                                    }
                                },
                                prodMode && {
                                    loader: "url-loader",
                                    options: {
                                        name: "images/[name].[hash].[ext]",
                                        limit: 3000,
                                        emitFile: clientBuild
                                    }
                                }
                            ].filter(t => !!t)
                        }
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    exclude: [/dist/, /node_modules\/(?!(semantic-ui-less\/themes)\/).*/],
                    use: [
                        devMode && {
                            loader: "file-loader",
                            options: {
                                name: "fonts/[name].[ext]",
                                emitFile: clientBuild
                            }
                        },
                        prodMode && {
                            loader: "url-loader",
                            options: {
                                name: "fonts/[name].[ext]",
                                limit: 3000,
                                mimetype: "application/font-woff",
                                emitFile: clientBuild
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    exclude: [/dist/, /node_modules\/(?!(semantic-ui-less\/themes)\/).*/],
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            emitFile: clientBuild,
                        },
                    }]
                },
                {
                    test: /\.otf(\?.*)?$/,
                    exclude: [/dist/, /node_modules\/(?!(semantic-ui-less\/themes)\/).*/],
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            mimetype: "application/font-otf",
                            emitFile: clientBuild,
                        },
                    }]
                },
            ].filter(x => !!x),
        },
        plugins: [
            new HardSourcePlugin({
                cacheDirectory: `${paths.cacheDir}/plugin.hardsource@${source}.${mode}`,
                cachePrune: {
                    maxAge: 2 * 24 * 60 * 60 * 1000,
                    sizeThreshold: 250 * 1024 * 1024
                }
            }),

            new HardSourcePlugin.ExcludeModulePlugin([{
                test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
            }]),

            new webpack.DefinePlugin({
                INJECTED_DEV_MODE: JSON.stringify(devMode),
                INJECTED_APP_CONFIG: JSON.stringify(appConfig),
                INJECTED_APP_ENTRY_POINT_ID: JSON.stringify(appEntrypointID),
                INJECTED_APP_MOUNT_POINT_ID: JSON.stringify(appMountPointID),
                "process.env.NODE_ENV": JSON.stringify(mode),
            }),

            rendererBuild && new webpack.DefinePlugin({
                INJECTED_GENERATED_HTML: JSON.stringify(generatedHTML),
                INJECTED_ASYNC_MODULE_STATS: JSON.stringify(JSON.parse(asyncModuleStats)),
            }),

            new webpack.EnvironmentPlugin({
                NODE_ENV: mode,
            }),

            clientBuild && new LoadablePlugin({
              filename: "async-modules.json",
            }),

            new CheckerPlugin(),

            /**
             * We only need to generate one bundle serverside
             */
            rendererBuild && new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),

            prodMode && new CommonJSTreeShakePlugin({
                onGlobalBailout: () => { return; },
            }),

            devMode && clientBuild && new webpack.HotModuleReplacementPlugin(),
            
            prodMode && clientBuild && new CleanBuildPlugin({
                verbose: false,
                cleanStaleWebpackAssets: true,
                cleanOnceBeforeBuildPatterns:[
                    '!index.html',
                    '!sw.js',
                    '!report.html',
                    `${paths.clientBuild}/scripts/*`,
                    `${paths.clientBuild}/styles/*`,
                    `${paths.clientBuild}/images/*`,
                    `${paths.clientBuild}/fonts/*`,
                ]
            }),

            new CaseSensitivePathsPlugin(),

            new LodashPlugin({
                exotics: true,
                deburring: true,
                unicode: true,
                cloning: true,
                currying: true,
                shorthands: true,
                collections: true,
                placeholders: true,
            }),

            prodMode && new webpack.HashedModuleIdsPlugin(),

            new ExtractCssChunksPlugin({
                filename: devMode ? "styles/[name].css" : "styles/[name].[hash].css",
                chunkFilename: devMode ? "styles/[id].css" : "styles/[id].[hash].css",
            }),

            // development
            devMode && clientBuild && new HtmlPlugin({
                filename: "index.html",
                template: `${paths.clientSrc}/index.html`,
                vars: {
                    lang: "en",
                    metas: "",
                    links: "",
                    styles: "",
                    app: "",
                    initialState: "{}",
                    scripts: "",
                    mountPointID: appMountPointID,
                },
            }),

            // HTML, no SSR
            prodMode && clientBuild && new HtmlPlugin({
                filename: "index.html",
                template: `${paths.clientSrc}/index.html`,
                cache: true,
                minify: true,
                vars: {
                    lang: "en",
                    metas: "",
                    links: "",
                    styles: "",
                    app: "",
                    initialState: "{}",
                    scripts: "",
                    mountPointID: appMountPointID,
                },
            }),

            // golang templates
            prodMode && clientBuild && new HtmlPlugin({
                filename: "index.gohtml",
                template: `${paths.clientSrc}/index.html`,
                cache: true,
                vars: {
                    lang: "{{.Lang}}",
                    metas: "{{.Metas}}",
                    links: "{{.Links}}",
                    styles: "{{.Styles}}",
                    app: "{{.App}}",
                    initialState: "{{.InitialState}}",
                    scripts: "{{.Scripts}}",
                    mountPointID: appMountPointID,
                },
            }),

            // golang templates; SSR
            prodMode && clientBuild && new HtmlPlugin({
                inject: false,
                filename: "index.ssr.gohtml",
                template: `${paths.clientSrc}/index.html`,
                cache: true,
                vars: {
                    lang: "{{.Lang}}",
                    metas: "{{.Metas}}",
                    links: "{{.Links}}",
                    styles: "{{.Styles}}",
                    app: "{{.App}}",
                    initialState: "{{.InitialState}}",
                    scripts: "{{.Scripts}}",
                    mountPointID: appMountPointID,
                },
          }),

            // handlebars templates
            prodMode && clientBuild && new HtmlPlugin({
                filename: "index.hbs",
                template: `${paths.clientSrc}/index.html`,
                cache: true,
                vars: {
                    lang: "{{{lang}}}",
                    metas: "{{{metas}}}",
                    links: "{{{links}}}",
                    styles: "{{{styles}}}",
                    app: "{{{app}}}",
                    initialState: "{{{initialState}}}",
                    scripts: "{{{scripts}}}",
                    mountPointID: appMountPointID,
                },
            }),

            // handlebars templates; SSR
            prodMode && clientBuild && new HtmlPlugin({
                inject: false,
                filename: "index.ssr.hbs",
                template: `${paths.clientSrc}/index.html`,
                cache: true,
                vars: {
                    lang: "{{{lang}}}",
                    metas: "{{{metas}}}",
                    links: "{{{links}}}",
                    styles: "{{{styles}}}",
                    app: "{{{app}}}",
                    initialState: "{{{initialState}}}",
                    scripts: "{{{scripts}}}",
                    mountPointID: appMountPointID,
                },
            }),

            prodMode && clientBuild && new HtmlScriptExtPlugin({
                defaultAttribute: "defer"
            }),

            prodMode && clientBuild && new ProgressiveWebAppPlugin({
                logo: `${paths.rootConfigDir}/logo/logo.png`,
                cache: `${paths.cacheDir}/plugin.pwa@${source}.${mode}`,
                prefix: "icons/",
                inject: "force",
                favicons: {
                    background: "#ddd",
                    theme_color: "#333",
                    appName: appConfig.appName,
                    appDescription: appConfig.appDescription,
                    icons: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        coast: false,
                        favicons: true,
                        firefox: true,
                        opengraph: true,
                        twitter: true,
                        windows: true,
                    },
                },
            }),

            prodMode && clientBuild && new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.js$"),
                // test: new RegExp("\\.(js|css)$"),
                minRatio: 0.8,
                cache: `${paths.cacheDir}/plugin.compression.gzip@${source}.${mode}`,
            }),

            prodMode && clientBuild && new CompressionPlugin({
                filename: "[path].br[query]",
                algorithm: "brotliCompress",
                test: new RegExp("\\.js$"),
                // test: new RegExp("\\.(js|css)$"),
                minRatio: 0.8,
                compressionOptions: { level: 11 },
                cache: `${paths.cacheDir}/plugin.compression.brotli@${source}.${mode}`,
            }),

            clientBuild && new RemoveServiceWorkerPlugin(),

            clientBuild && new OfflinePlugin({
                caches: "all",
                appShell: "/",
                responseStrategy: devMode ? "network-first" : "cache-first",
                excludes: ["**/*.map", "index.html"],
                autoUpdate: 1000 * 60 * 3,
                AppCache: false,
                ServiceWorker: {
                    events: true,
                    minify: false,
                    navigateFallbackURL: "/",
                },
            }),

            prodMode && clientBuild && new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: false,
                generateStatsFile: true,
                statsFilename: `${paths.buildDir}/stats.${source}.json`,
                reportFilename: `${paths.buildDir}/stats.${source}.html`,
            }),
        ].filter(t => !!t)
    }

    if (clientBuild) {
        // Client-specific build options

        config.entry[appEntrypointID] = ["src/client/main.tsx"];

        config.output = {
            path: paths.clientBuild,
            filename: devMode ? "scripts/[name].js" : "scripts/[name].[chunkhash].js",
            publicPath: devMode ? "/" : "/assets/",
            crossOriginLoading: "anonymous",
        }
    } else {
        // Renderer-specific build options

        config.entry = {
            renderer: ["src/renderer/index.tsx"],
        };

        config.output = {
            path: paths.rendererBuild,
            filename: "index.js",
            publicPath: "/assets/",
            libraryTarget: "commonjs",
        };

        // config.externals = [
        //     webpackNodeExternals({
        //         // whitelist: ["is-webpack-bundle", "webpack-require-weak"],
        //         // whitelist: ["is-webpack-bundle", "webpack-require-weak"]
        //     })
        // ]
    }

    return config
}
