const CracoEsbuildPlugin = require("craco-esbuild");
const path = require("path");

module.exports = {
    eslint: {
        // only enable eslint for development
        enable: process.env.NODE_ENV === "development",
        loaderOptions: require("./.eslintrc.js"),
    },
    webpack: {
        configure: (config, context) => {
            const appPublic = context.paths.appPublic;
            const appHtml = path.join(appPublic, "index.html");

            context.paths.appPublic = path.resolve("static");
            context.paths.appHtml = path.resolve("static", "index.html");
            context.paths.appIndexJs = path.resolve("static", "index.tsx");

            if (config.plugins) {
                config.plugins = replacePathInPluginsOptions(
                    config.plugins,
                    appPublic,
                    context.paths.appPublic
                );
                config.plugins = replacePathInPluginsOptions(
                    config.plugins,
                    appHtml,
                    context.paths.appHtml
                );
            }

            return config;
        },
    },
    devServer: (config) => {
        console.log(config);

        return config;
    },
    plugins: [
        {
            plugin: CracoEsbuildPlugin,
            options: {
                esbuildLoaderOptions: {
                    loader: "tsx",
                    target: "es2022",
                },
                esbuildMinimizerOptions: {
                    target: "es2022",
                    css: true,
                },
                skipEsbuildJest: false,
                esbuildJestOptions: {
                    loaders: {
                        ".ts": "ts",
                        ".tsx": "tsx",
                    },
                },
            }
        }
    ],
};

function replacePathInPluginsOptions(plugins, search, replace) {
    return plugins.map((plugin) => {
        if (!plugin) return plugin;
        if (plugin.options && typeof plugin.options === 'object') {
            Object.keys(plugin.options).forEach((key) => {
                if (
                    typeof plugin.options[key] === 'string' &&
                    plugin.options[key] === search
                ) {
                    plugin.options[key] = replace;
                }
            });
        }
        return plugin;
    });
}