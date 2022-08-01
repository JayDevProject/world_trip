import express from "express";
import { world, asia_land } from "../controllers/mainController.js";

const mainRouter = express.Router();

mainRouter.get("/", world);
mainRouter.get("/asia", asia_land);

export default mainRouter;
