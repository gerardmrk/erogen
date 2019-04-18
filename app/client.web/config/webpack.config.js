/* global process, __dirname, module, require */
/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/camelcase */
const path = require("path");

const Fiber = require("fibers");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanBuildPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const DeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin").default;
const CommonJSTreeShakePlugin = require("webpack-common-shake").Plugin;
// const FaviconsPlugin = require("favicons-webpack-plugin")
const HtmlIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlScriptExtPlugin = require("script-ext-html-webpack-plugin");
const LodashPlugin = require("lodash-webpack-plugin");
const OfflinePlugin = require("offline-plugin");
const RemoveServiceWorkerPlugin = require("webpack-remove-serviceworker-plugin");
const SubresourceIntegrityPlugin = require("webpack-subresource-integrity");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CheckerPlugin, TsConfigPathsPlugin } = require("awesome-typescript-loader"); // prettier-ignore

const ROOT_APP_DIR = path.resolve(__dirname, "..");
const DST_DIR = `${ROOT_APP_DIR}/dist`;
const SRC_DIR = `${ROOT_APP_DIR}/src`;

const CLIENT_SRC = `${SRC_DIR}/client`;
const RENDERER_SRC = `${SRC_DIR}/renderer`;

const CLIENT_DST = `${DST_DIR}/client`;
const RENDERER_DST = `${DST_DIR}/renderer`;

// prettier-ignore
module.exports = async ({ mode = "development", source = "client" }) => {
    if (mode !== "development" && mode !== "production") {
        throw new Error("'mode' option must be 'development' or 'production'");
    }

    if (source !== "client" && source !== "renderer") {
        throw new Error("'source' option must be 'client' or 'renderer'");
    }

    const appConfig = { appName: 'erogen' } // TODO: dynamic
    const appRuntimeStage = 'local'; // TODO: dynamic

    const devMode = mode === "development";
    const buildForClient = source === "client";

    // base config
    const config = {
        context: ROOT_APP_DIR,

        mode: mode,

        target: buildForClient ? "web" : "node",

        entry: {
          // resolved below
        },

        resolve: {
            enforceExtension: false,
            mainFields: ["browser", "module", "main"],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", "scss"],
            alias: {
                "@client": CLIENT_SRC,
                "@renderer": RENDERER_SRC
            },
            plugins: [
              new TsConfigPathsPlugin({
                configFileName: `${ROOT_APP_DIR}/tsconfig.json`
              }),
            ]
        },

        devtool: devMode ? "cheap-module-eval-source-map" : false,

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

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: "awesome-typescript-loader",
                        options: {
                            useCache: true,
                            useBabel: true,
                            errorsAsWarnings: true,
                            useTranspileModule: true,
                            forceIsolatedModules: true,
                            configFileName: `${ROOT_APP_DIR}/tsconfig.json`,
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
                                      targets: buildForClient ? { browsers: ["last 2 versions", "not ie < 11"] } : { node: "current" }
                                  }],
                                  "@babel/preset-react",
                              ],
                              plugins: [
                                  "@loadable/babel-plugin",
                                  "@babel/plugin-syntax-dynamic-import",
                                  ["@babel/plugin-proposal-class-properties", { loose: true }],
                                  ["@babel/plugin-transform-runtime", { regenerator: false }],
                                  ["lodash", { id: "lodash-compat" }],
                                  ["transform-imports", { lodash: { transform: "lodash/${member}", preventFullImport: true } }],
                                  "react-hot-loader/babel"
                              ]
                           }
                        }
                    }]
                },
                {
                    test: /\.js$/,
                    enforce: "pre",
                    use: ["source-map-loader"]
                },
                {
                    test: /\.scss$/,
                    exclude: [/node_modules/],
                    use: [
                        !devMode && { 
                            loader: ExtractCssChunksPlugin.loader,
                            options: {
                              hot: false,
                              reloadAll: false,
                            },
                        },
                        devMode && buildForClient && {
                            loader: "style-loader",
                            options: {
                                sourceMap: devMode,
                                hmr: true,
                                insertInto: "head",
                                insertAt: "bottom"
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: devMode,
                                modules: true,
                                importLoaders: 1,
                                camelCase: true,
                                localIdentName: devMode ? "[name]_[local]_[hash:base64:7]" : "[hash:base64:7]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: devMode,
                                plugins: () => [require("autoprefixer")()]
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: devMode,
                                fiber: Fiber,
                                implementation: require("sass")
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                    exclude: [/node_modules/],
                    oneOf: [
                        {
                            loader: "file-loader",
                            options: {
                                emitFile: buildForClient,
                                name: devMode ? "images/[name].[ext]" : "images/[name].[ext]?[hash]"
                            }
                        },
                        {
                            use: [
                                devMode && {
                                    loader: "file-loader",
                                    options: {
                                        name: "images/[name].[ext]",
                                        emitFile: buildForClient
                                    }
                                },
                                !devMode && {
                                    loader: "url-loader",
                                    options: {
                                        name: "images/[name].[ext]?[hash]",
                                        limit: 3000,
                                        emitFile: buildForClient
                                    }
                                }
                            ].filter(t => !!t)
                        }
                    ]
                },
                {
                    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    exclude: [/node_modules/],
                    use: [
                        devMode && {
                            loader: "file-loader",
                            options: {
                                name: "fonts/[name].[ext]",
                                emitFile: buildForClient
                            }
                        },
                        !devMode && {
                            loader: "url-loader",
                            options: {
                                name: "fonts/[name].[ext]",
                                limit: 3000,
                                mimetype: "application/font-woff",
                                emitFile: buildForClient
                            }
                        }
                    ].filter(t => !!t)
                },
                {
                    test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            emitFile: buildForClient,
                        },
                    }]
                },
                {
                    test: /\.otf(\?.*)?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            mimetype: "application/font-otf",
                            emitFile: buildForClient,
                        },
                    }]
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                INJECTED_DEV_MODE: devMode,
                INJECTED_APP_STAGE: appRuntimeStage,
                INJECTED_APP_CONFIG: appConfig,
            }),

            new webpack.EnvironmentPlugin({
                NODE_ENV: mode,
            }),

            new CheckerPlugin(),

            !buildForClient && new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            }),

            !devMode && new DeepScopeAnalysisPlugin(),

            !devMode && new CommonJSTreeShakePlugin(),

            devMode && buildForClient && new webpack.HotModuleReplacementPlugin(),
            
            !devMode && buildForClient && new CleanBuildPlugin({
                verbose: true,
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

            !devMode && !buildForClient && new webpack.BannerPlugin({
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

            !devMode && new webpack.HashedModuleIdsPlugin(),

            !devMode && buildForClient && new ExtractCssChunksPlugin({
                filename: "styles/[name].[chunkhash].css",
                chunkFilename: "styles/[id].[chunkhash].css",
            }),

            buildForClient && new HtmlPlugin({
                filename: "index.html",
                template: `${CLIENT_SRC}/index.html`,
                vars: {
                    seosPlaceholder: devMode ? "" : "{{.SeoElements}}",
                    criticalCSSPlaceholder: devMode ? "" : "{{.CriticalCSS}}",
                    appPlaceholder: devMode ? "" : "{{.App}}",
                    initialStatePlaceholder: devMode ? "undefined" : "{{.InitialState}}",
                },
            }),

            buildForClient && new HtmlScriptExtPlugin({
              defaultAttribute: "defer"
            }),

            // !devMode && buildForClient && new FaviconsPlugin({
            //     logo: path.resolve(__dirname, "src/client/logo.png"),
            //     prefix: `icons-[hash]/`,
            //     emitStats: true,
            //     statsFilename: `iconstats-[hash].json`,
            //     persistentCache: true,
            //     inject: true,
            //     background: "#fff",
            //     title: "x", // TODO: un-hardcode this
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

            buildForClient && new HtmlIncludeAssetsPlugin({
              append: false,
              assets: []
            }),

            new SubresourceIntegrityPlugin({
                enabled: !devMode && buildForClient,
                hashFuncNames: ["sha256", "sha512"],
            }),

            !devMode && buildForClient && new CompressionPlugin({
                filename: "[path].gz[query]",
                algorithm: "gzip",
                test: new RegExp("\\.(js|css)$"),
                minRatio: 0.8,
            }),

            buildForClient && new RemoveServiceWorkerPlugin(),

            buildForClient && new OfflinePlugin({
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

            !devMode && buildForClient && new BundleAnalyzerPlugin({
                analyzerMode: "static",
                openAnalyzer: !process.env.CI,
                generateStatsFile: true,
                statsFilename: `${DST_DIR}/stats.${source}.json`,
                reportFilename: `${DST_DIR}/stats.${source}.html`,
            }),
        ].filter(t => !!t)
    }

    if (buildForClient) {
        // Client-specific build options

        config.entry.app = ["src/client/main.tsx"]

        config.output = {
            path: CLIENT_DST,
            filename: devMode ? "scripts/[name].js" : "scripts/[name].[chunkhash].js",
            publicPath: devMode ? "/" : "/assets/",
            crossOriginLoading: "anonymous"
        }

        config.optimization = {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all",
                        // maxSize: devMode ? undefined : 80000,
                        // maxSize: 80000
                    }
                }
            },
            minimizer: [
                new UglifyJsPlugin({
                    parallel: true,
                    exclude: [/dist/],
                    extractComments: "all",
                    uglifyOptions: {
                      output: null,
                      ie8: false,
                      keep_fnames: true,
                      mangle: {
                        keep_fnames: true,
                        properties: {
                          keep_quoted: true
                        }
                      }
                    }
                })
            ]
        }
    } else {
        // Renderer-specific build options

        config.entry.renderer = ["src/renderer/index.tsx"]

        config.output = {
            path: RENDERER_DST,
            filename: "[name].js",
            libraryTarget: "commonjs"
        }

        config.externals = [
            webpackNodeExternals({
                whitelist: ["is-webpack-bundle", "webpack-require-weak"]
            })
        ]
    }

    return config
}
