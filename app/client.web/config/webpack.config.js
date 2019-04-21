/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const path = require("path");

const glob = require("glob");
const Fiber = require("fibers");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const HardSourcePlugin = require("hard-source-webpack-plugin");
const CleanBuildPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunksPlugin = require("mini-css-extract-plugin");
const DeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin").default;
const CommonJSTreeShakePlugin = require("webpack-common-shake").Plugin;
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
// const FaviconsPlugin = require("favicons-webpack-plugin");
const HtmlIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlScriptExtPlugin = require("script-ext-html-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin");
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity");
const TerserPlugin = require("terser-webpack-plugin");
const LoadablePlugin = require("@loadable/webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader"); // prettier-ignore
const settingsBuilder = require("./webpack.settings");

const ROOT_DIR = path.resolve(__dirname, "..", "..", "..");
const ROOT_CONFIG_DIR = `${ROOT_DIR}/config`;

const ROOT_APP_DIR = path.resolve(__dirname, "..");
const APP_CONFIG_DIR = `${ROOT_APP_DIR}/config`;
const APP_CACHE_DIR = `${ROOT_APP_DIR}/.cache`;

const DST_DIR = `${ROOT_APP_DIR}/dist`;
const SRC_DIR = `${ROOT_APP_DIR}/src`;

const CLIENT_SRC = `${SRC_DIR}/client`;
const RENDERER_SRC = `${SRC_DIR}/renderer`;

const CLIENT_DST = `${DST_DIR}/client`;
const RENDERER_DST = `${DST_DIR}/renderer`;

const getSettings = settingsBuilder(ROOT_APP_DIR);

// prettier-ignore
module.exports = async (args) => {
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
    } = getSettings(args);

    // base config
    const config = {
        context: ROOT_APP_DIR,

        mode: mode,

        target: clientBuild ? "web" : "node",

        entry: {
          // resolved below
        },

        resolve: {
            enforceExtension: false,
            mainFields: ["browser", "module", "main"],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", "scss"],
            alias: {
                // source code
                "@client": CLIENT_SRC,
                "@renderer": RENDERER_SRC,
                // semantic ui theming path resolution
                "@themeStyles": `${ROOT_APP_DIR}/ui-theme/semantic.less`,
                "../../theme.config$": `${ROOT_APP_DIR}/ui-theme/theme.config`,
            },
            plugins: [
              new TsConfigPathsPlugin({
                configFileName: `${ROOT_APP_DIR}/tsconfig.${source}.json`
              }),
            ]
        },

        devtool: devMode ? "cheap-module-eval-source-map" : rendererBuild ? "source-map" : false,

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

        stats: {
          modules: false,
          children: false,
          assetsSort: 'name',
          excludeAssets: /LICENSE$/
        },

        optimization: {
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
                        // maxSize: devMode ? undefined : 80000,
                        // maxSize: 80000,
                    }
                }
            },
            minimizer: [
                clientBuild && new TerserPlugin({
                    cache: `${APP_CACHE_DIR}/terser.${source}`,
                    parallel: true,
                    exclude: [/dist/],
                    // extractComments: true,
                    terserOptions: {
                        output: null,
                        ie8: false,
                        keep_fnames: true,
                        sourceMap: rendererBuild,
                        mangle: {
                          keep_fnames: true,
                          properties: {
                              keep_quoted: true
                          }
                        }
                    }
                }),
                clientBuild && new OptimizeCssAssetsPlugin({
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
                            cacheDirectory: `${APP_CACHE_DIR}/atl.${source}`,
                            errorsAsWarnings: true,
                            useTranspileModule: true,
                            forceIsolatedModules: true,
                            configFileName: `${ROOT_APP_DIR}/tsconfig.${source}.json`,
                            reportFiles: ["src/**/*.{ts,tsx}"],
                            babelCore: "@babel/core",
                            babelOptions: {
                              babelrc: false,
                              presets: [
                                  ["@babel/preset-env", {
                                      modules: false,
                                      loose: true,
                                      useBuiltIns: "usage",
                                      corejs: { version: 3 },
                                      targets: clientBuild ? { browsers: ["last 2 versions", "not dead", "> 0.5%", "not ie < 11"] } : { node: "current" }
                                  }],
                                  "@babel/preset-react",
                              ],
                              plugins: [
                                  "@loadable/babel-plugin",
                                  "@babel/plugin-syntax-dynamic-import",
                                  rendererBuild && "dynamic-import-node",
                                  ["@babel/plugin-proposal-class-properties", { loose: true }],
                                  ["@babel/plugin-transform-runtime", { regenerator: false }],
                                  ["lodash", { id: "lodash-compat" }],
                                  ["transform-imports", { lodash: { transform: "lodash/${member}", preventFullImport: true } }],
                                  rendererBuild && ["css-modules-transform", { extensions: [".css", ".scss"], generateScopedName: "[hash:base64:7]" }],
                                  "react-hot-loader/babel"
                              ].filter(x => !!x),
                           }
                        }
                    }]
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
                                sourceMap: devMode || rendererBuild,
                                modules: true,
                                importLoaders: 1,
                                camelCase: true,
                                localIdentName: devMode ? "[name]_[local]_[hash:base64:7]" : "[hash:base64:7]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: devMode || rendererBuild,
                                plugins: () => [require("autoprefixer")()]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: devMode || rendererBuild,
                                fiber: Fiber,
                                implementation: require("sass")
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.less$/,
                    exclude: [/dist/, /node_modules/],
                    use: [
                        { 
                            loader: ExtractCssChunksPlugin.loader,
                            options: {
                              hmr: devMode,
                            },
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode || rendererBuild,
                            }
                        },
                        {
                            loader: "less-loader",
                            options: {
                                sourceMap: devMode || rendererBuild,
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
                                name: devMode ? "images/[name].[ext]" : "images/[name].[ext]?[hash]"
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
                                        name: "images/[name].[ext]?[hash]",
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
                }
            ]
        },
        plugins: [
            new HardSourcePlugin({
                cacheDirectory: `${APP_CACHE_DIR}/hard-source.${source}`
            }),

            new webpack.DefinePlugin({
                INJECTED_DEV_MODE: JSON.stringify(devMode),
                INJECTED_APP_CONFIG: JSON.stringify(appConfig),
                'process.env.NODE_ENV': JSON.stringify(mode)
            }),

            new webpack.EnvironmentPlugin({
                NODE_ENV: mode,
            }),

            clientBuild && new LoadablePlugin({
              filename: "async-modules.json",
            }),

            new CheckerPlugin(),

            rendererBuild && new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),

            prodMode && new DeepScopeAnalysisPlugin(),

            prodMode && new CommonJSTreeShakePlugin(),

            devMode && clientBuild && new webpack.HotModuleReplacementPlugin(),
            
            prodMode && clientBuild && new CleanBuildPlugin({
                verbose: false,
                cleanStaleWebpackAssets: true,
                cleanOnceBeforeBuildPatterns:[
                    '!index.html',
                    '!sw.js',
                    '!report.html',
                    `${CLIENT_DST}/scripts/*`,
                    `${CLIENT_DST}/styles/*`,
                    `${CLIENT_DST}/images/*`,
                    `${CLIENT_DST}/fonts/*`,
                ]
            }),

            prodMode && rendererBuild && new webpack.BannerPlugin({
                raw: true,
                entryOnly: false,
                banner: "require('source-map-support').install();",
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

            prodMode && clientBuild && new PurgeCSSPlugin({
                paths: glob.sync(`${CLIENT_SRC}/**/*`, { nodir: true }),
                only: ["bundle", "vendor"],
            }),

            clientBuild && new HtmlPlugin({
                filename: "index.html",
                template: `${CLIENT_SRC}/index.html`,
                vars: {
                    seosPlaceholder: devMode ? "" : "{{.SeoElements}}",
                    criticalCSSPlaceholder: devMode ? "" : "{{.CriticalCSS}}",
                    appPlaceholder: devMode ? "" : "{{.App}}",
                    initialStatePlaceholder: devMode ? "undefined" : "{{.InitialState}}",
                },
            }),

            clientBuild && new HtmlScriptExtPlugin({
                defaultAttribute: "defer"
            }),

            // prodMode && clientBuild && new FaviconsPlugin({
            //     logo: `${ROOT_CONFIG_DIR}/logo/logo.png`,
            //     prefix: `icons-[hash]/`,
            //     emitStats: true,
            //     statsFilename: `iconstats-[hash].json`,
            //     persistentCache: true,
            //     inject: true,
            //     background: "#fff",
            //     title: appConfig.appName,
            //     icons: {
            //         android: true,
            //         appleIcon: true,
            //         appleStartup: true,
            //         coast: false,
            //         favicons: true,
            //         firefox: false,
            //         opengraph: true,
            //         twitter: false,
            //         windows: false,
            //     },
            // }),

            clientBuild && new HtmlIncludeAssetsPlugin({
                append: false,
                assets: []
            }),

            new SubresourceIntegrityPlugin({
                enabled: prodMode && clientBuild,
                hashFuncNames: ["sha256", "sha512"],
            }),

            prodMode && clientBuild && new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.(js|css)$"),
                minRatio: 0.8,
            }),

            clientBuild && new RemoveServiceWorkerPlugin(),

            clientBuild && new OfflinePlugin({
                caches: "all",
                appShell: "/",
                responseStrategy: devMode ? "network-first" : "cache-first",
                excludes: ["**/*.map", "index.gohtml"],
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
                openAnalyzer: !process.env.CI,
                generateStatsFile: true,
                statsFilename: `${DST_DIR}/stats.${source}.json`,
                reportFilename: `${DST_DIR}/stats.${source}.html`,
            }),
        ].filter(t => !!t)
    }

    if (clientBuild) {
        // Client-specific build options

        config.entry.app = ["src/client/main.tsx"]

        config.output = {
            path: CLIENT_DST,
            filename: devMode ? "scripts/[name].js" : "scripts/[name].[chunkhash].js",
            publicPath: devMode ? "/" : "/assets/",
            crossOriginLoading: "anonymous"
        }
    } else {
        // Renderer-specific build options

        config.entry = {
          renderer: ["src/renderer/uds-server/index.ts"],
        };

        config.output = {
            path: RENDERER_DST,
            filename: "index.js",
            libraryTarget: "commonjs",
        };

        config.externals = [
            webpackNodeExternals({
                whitelist: ["is-webpack-bundle", "webpack-require-weak", "semantic-ui-less/themes"]
            })
        ]
    }

    return config
}
