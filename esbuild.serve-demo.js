import LiveServer from "live-server";
import chokidar from "chokidar";
import {buildDemo} from "./esbuild.utils.js";

await buildDemo();

LiveServer.start({
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
    root: "./demo",
    file: "index.html",
    wait: 1000,
    open: false,
    logLevel: 2,
});

chokidar.watch(["./src", "./demo-src"], {ignored:/build|node_modules|\.idea|\.git/}).on("all", async () => {
    await buildDemo();

    const {watcher} = LiveServer;
    watcher.emit("change", "./demo/index.html");
});