import express from "express";
import cons from "consolidate";
import mainRouter from "./src/routers/mainRouter.js";
import worldRouter from "./src/routers/worldRouter.js";

import "./database/connect.js";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);
app.use("/world", worldRouter);

app.use("/node_modules", express.static("node_modules"));
app.use(express.static("script"));
app.use(express.static("file"));

app.listen(4000, () => {
  console.log("Welcome to world_trip!");
});
