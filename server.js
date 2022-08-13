import express from "express";
import cons from "consolidate";
import mainRouter from "./src/routers/mainRouter.js";

import "./database/connect.js";

const app = express();

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.use("/", mainRouter);

app.use(express.static("node_modules"));
app.use(express.static("script/js"));
app.use(express.static("script/css"));
app.use(express.static("earth"));

app.listen(4000, () => {
  console.log("Welcome to world_trip!");
});
