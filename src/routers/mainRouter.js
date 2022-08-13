import express from "express";
import {
  world,
  asia_land,
  europe_land,
  login,
  getAccount,
  postAccount,
  getLoginHelp,
} from "../controllers/mainController.js";

const mainRouter = express.Router();

mainRouter.get("/", login);
mainRouter.route("/account").get(getAccount).post(postAccount);
mainRouter.get("/loginHelp", getLoginHelp);

mainRouter.get("/world", world);
mainRouter.get("/asia", asia_land);
mainRouter.get("/europe", europe_land);

export default mainRouter;
