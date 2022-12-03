import express from "express";
import path from "path";
import multer from "multer";
import {
  getLogin,
  postLogin,
  getAccount,
  postAccount,
  getLoginHelp,
  postLoginHelp,
  logout,
} from "../controllers/loginController.js";
import {
  getEditProfile,
  postEditProfile,
} from "../controllers/loginController.js";
import {
  login_inspect,
  email,
  findEmail,
} from "../middlewares/loginMiddleware.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      // 절대경로로 변경
      cb(
        null,
        path.join(process.cwd(), "/server/public/file/upload/userProfile")
      );
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const loginRouter = express.Router();

// 나중에 로그인 url 을 /login 으로 변경하고, 로그인 이후 메뉴 단계를 '/' 로 변경.
// 당연히 로그인이 되어 있는지 없는지 유효성 검사는 해야한다.

loginRouter.route("/").get(getLogin).post(postLogin);
loginRouter.route("/account").get(getAccount).post(email, postAccount);
loginRouter
  .route("/account/editProfile")
  .get(login_inspect, getEditProfile)
  .post(upload.single("upload_profileImg"), postEditProfile);
loginRouter
  .route("/loginHelp")
  .get(getLoginHelp)
  .post(findEmail, postLoginHelp);

loginRouter.get("/logout", logout);

export default loginRouter;
