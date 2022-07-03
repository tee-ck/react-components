import LiveServer from "live-server";
import chokidar from "chokidar";
import {generateDemo} from "./esbuild.utils.js";

await generateDemo();

LiveServer.start({
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
    root: "./demo",
    file: "index.html",
    wait: 1000,
    open: false,
    logLevel: 2,
});

chokidar.watch(["./src", "./demo-src"], {ignored:/build|node_modules|\.idea|\.git/}).on("all", async (event, path) => {
    switch (event) {
        case "change": {
            await generateDemo();

            break;
        }
    }
});