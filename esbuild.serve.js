// import servor from "servor";
// import chokidar from "chokidar";
// import {buildDemo} from "./esbuild.utils.js";
//
//
// await buildDemo();
//
// chokidar.watch("./src", {ignored:/build|node_modules|\.idea|\.git/}).on("all", async () => {
//     await buildDemo();
// });
//
// chokidar.watch("./static", {ignored:/build|node_modules|\.idea|\.git/}).on("all", async () => {
//     await buildDemo();
// });
//
// await servor({
//     root: "./demo",
//     fallback: "index.html",
//     module: false,
//     static: false,
//     reload: true,
//     inject: "",
//     credentials: null,
//     port: process.env.PORT || 3000,
// });