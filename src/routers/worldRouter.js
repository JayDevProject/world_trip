import express from "express";
import {
  world,
  asia_land,
  korea,
  europe_land,
} from "../controllers/worldController.js";

const worldRouter = express.Router();

worldRouter.get("/", world);

worldRouter.get("/asia", asia_land);
worldRouter.get("/asia/korea", korea);

worldRouter.get("/europe", europe_land);

export default worldRouter;
