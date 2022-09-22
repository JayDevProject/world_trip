import express from "express";
import {
  getLogin,
  postLogin,
  getAccount,
  postAccount,
  getLoginHelp,
  postLoginHelp,
} from "../controllers/loginController.js";

const loginRouter = express.Router();

// 나중에 로그인 url 을 /login 으로 변경하고, 로그인 이후 메뉴 단계를 '/' 로 변경.
// 당연히 로그인이 되어 있는지 없는지 유효성 검사는 해야한다.

loginRouter.route("/").get(getLogin).post(postLogin);
loginRouter.route("/account").get(getAccount).post(postAccount);
loginRouter.route("/loginHelp").get(getLoginHelp).post(postLoginHelp);

export default loginRouter;
