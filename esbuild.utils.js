import esbuild from "esbuild";
import {sassPlugin} from "esbuild-sass-plugin";
import fs from "fs-extra";

export const buildDemo = async () => {
    await fs.rm("./demo", {recursive: true, force: true});
    await fs.copy("./static/index.html", "./demo/index.html", {overwrite: true});

    return await esbuild.build({
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
        outdir: "./demo",
        platform: "browser",
        plugins: [
            sassPlugin(),
        ],
    });
};