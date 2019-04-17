/* global process, __dirname, module, require */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const Fiber = require("fibers");
const webpack = require("webpack");
const webpackNodeExternals = require("webpack-node-externals");

const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanBuildPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ExtractCssChunksPlugin = require("extract-css-chunks-webpack-plugin");
const DeepScopeAnalysisPlugin = require("webpack-deep-scope-plugin").default;
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
const {
  CheckerPlugin,
  TsConfigPathsPlugin,
} = require("awesome-typescript-loader");

// prettier-ignore
module.exports = async ({ mode = "development", source = "client" }) => {
    if (mode !== "development" && mode !== "production") {
        throw new Error("'mode' option must be 'development' or 'production'")
    }

    if (source !== "client" && source !== "renderer") {
        throw new Error("'source' option must be 'client' or 'renderer'")
    }

    const devMode = mode === "development"
    const buildForClient = source === "client"

    // base config
    const config = {
        context: process.cwd(),
        mode: mode,
        target: buildForClient ? "web" : "node",
        entry: {},
        resolve: {
            enforceExtension: false,
            mainFields: ["browser", "module", "main"],
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css", "scss"],
            alias: {
                "@client": path.resolve(__dirname, "src/client"),
                "@renderer": path.resolve(__dirname, "src/renderer")
            },
            plugins: [
              new TsConfigPathsPlugin({
                configFileName: path.resolve(__dirname, 'tsconfig.json')
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
        stats: { modules: false, children: false },
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
                            configFileName: path.resolve(__dirname, 'tsconfig.json'),
                            reportFiles: ["src/**/*.{ts,tsx}"],
                            babelCore: "@babel/core",
                            babelOptions: {
                              babelrc: false,
                              presets: [
                                  ["@babel/preset-env", {
                                      modules: false,
                                      loose: true,
                                      useBuiltIns: "usage",
                                      corejs: { version: 3, proposals: true },
                                      targets: buildForClient ? { browsers: ["last 2 versions", "not ie < 11"] } : { node: "current" }
                                  }],
                                  "@babel/preset-react",
                              ],
                              plugins: [
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
                        !devMode && buildForClient && ExtractCssChunksPlugin.loader,
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
                                        limit: 5000,
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
                                limit: 5000,
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
            new CheckerPlugin(),
            !devMode && new DeepScopeAnalysisPlugin(),
            new webpack.DefinePlugin({
                DEV_MODE: devMode,
                INJECTED_SETTINGS: JSON.stringify({}), // TODO: inject settings
            }),
            new webpack.EnvironmentPlugin({
                NODE_ENV: mode,
                APP_STAGE: "local",
            }),
            devMode && buildForClient && new webpack.HotModuleReplacementPlugin(),
            !devMode && new CleanBuildPlugin({
              verbose: true,
              cleanStaleWebpackAssets: true,
              cleanOnceBeforeBuildPatterns:[
                '!index.html',
                '!sw.js',
                '!report.html',
                path.resolve(__dirname, "dist/client/scripts/*"),
                path.resolve(__dirname, "dist/client/styles/*"),
                path.resolve(__dirname, "dist/client/images/*"),
                path.resolve(__dirname, "dist/client/fonts/*"),
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
            buildForClient && new CopyPlugin([{
                from: "node_modules/normalize.css/normalize.css",
                to: path.resolve(__dirname, "dist/client/styles/normalize.css"),
            }]),
            !devMode && buildForClient && new ExtractCssChunksPlugin({
                filename: "styles/[name].[chunkhash].css",
                chunkFilename: "styles/[id].[chunkhash].css",
            }),
            buildForClient && new HtmlPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "src/client/index.html"),
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
            buildForClient && new HtmlIncludeAssetsPlugin({ append: false, assets: [] }),
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
                statsFilename: path.resolve(__dirname, "dist/client/bundle-stats.json"),
                reportFilename: path.resolve(__dirname, "dist/client/bundle-stats.html"),
            }),
        ].filter(t => !!t)
    }

    if (buildForClient) {
        // Client-specific build options

        config.entry.app = [`${path.resolve(__dirname, "src/client/main.tsx")}`]

        config.output = {
            path: `${path.resolve(__dirname, "dist/client")}`,
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
                    sourceMap: devMode
                })
            ]
        }
    } else {
        // Renderer-specific build options

        config.entry.renderer = [`${path.resolve(__dirname, "src/renderer/index.ts")}`]

        config.output = {
            path: `${path.resolve(__dirname, "dist/renderer")}`,
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
