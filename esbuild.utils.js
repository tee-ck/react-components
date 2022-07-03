import esbuild from "esbuild";
import {sassPlugin} from "esbuild-sass-plugin";
import fs from "fs-extra";

export const generateDemo = async () => {
    const start = Date.now();

    await fs.rm("./demo", {recursive: true, force: true});
    await fs.copy("./demo-src/index.html", "./demo/index.html", {overwrite: true});

    await esbuild.build({
        entryPoints: [
            "./demo-src/index.tsx",
        ],
        target: "es2020",
        loader: {
            ".ts": "ts",
            ".tsx": "tsx",
        },
        minify: true,
        legalComments: "none",
        bundle: true,
        sourcemap: false,
        // outfile: "./demo-src/index.js",
        outdir: "./demo",
        platform: "browser",
        plugins: [
            sassPlugin(),
        ],
    });

    console.log(`Compiled demo in ${Date.now() - start}ms`);
};