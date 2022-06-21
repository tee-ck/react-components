import {sassPlugin} from "esbuild-sass-plugin";
import esbuild from "esbuild";

esbuild.serve({servedir: "./static", host: "localhost", port: 4000}, {
    entryPoints: [
        "./static/index.tsx",
    ],
    target: "es2022",
    loader: {
        ".ts": "ts",
        ".tsx": "tsx",
    },
    minify: true,
    bundle: true,
    sourcemap: false,
    // outfile: "./static/index.js",
    outdir: "./static",
    platform: "browser",
    plugins: [
        sassPlugin(),
    ],

}).then(result => {
    console.log(result);

});