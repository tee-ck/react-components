import {sassPlugin} from "esbuild-sass-plugin";
import esbuild from "esbuild";


esbuild.build({
    entryPoints: [
        "./static/index.tsx",
    ],
    target: "es2022",
    loader: {
        ".ts": "ts",
        ".tsx": "tsx",
    },
    minify: true,
    legalComments: "none",
    bundle: true,
    sourcemap: false,
    // outfile: "./static/index.js",
    outdir: "./dist",
    platform: "browser",
    plugins: [
        sassPlugin(),
    ],
}).then(console.log);