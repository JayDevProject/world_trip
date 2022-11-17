import express from "express";
import session from "express-session";

import "dotenv/config";

import "./database/connect.js";

import loginRouter from "./src/routers/loginRouter.js";
import tripRouter from "./src/routers/tripRouter.js";

const app = express();

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.set("views", "./server/src/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", loginRouter);
app.use("/trip", tripRouter);

app.use("/node_modules", express.static("node_modules"));
app.use("/script", express.static("server/public/script"));
app.use("/file", express.static("server/public/file"));

app.listen(4000, () => {
  console.log("Welcome to trip!");
});
