import express from "express";
import path from "path";
import multer from "multer";
import {
  home,
  world,
  album,
  getPhoto,
  postPhoto,
  getProfile,
  getUpload,
  postUpload,
} from "../controllers/tripController.js";
import { login_inspect } from "../middlewares/loginMiddleware.js";
import { continent } from "../middlewares/tripMiddleware.js";

// 확장자에 따른 저장 폴더 구분 및 이름 변경
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      // 절대경로로 변경
      cb(null, path.join(process.cwd(), "/server/public/file/upload/image"));
    } else if (file.originalname.match(/\.(mp4|glf)$/)) {
      cb(null, path.join(process.cwd(), "/server/public/file/upload/video/"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const tripRouter = express.Router();

// 메인화면
tripRouter.get("/", login_inspect, home);

// 업로드
tripRouter
  .route("/upload")
  .get(login_inspect, getUpload)
  .post(upload.array("upload_file"), postUpload);

tripRouter.get("/:id", login_inspect, album);
tripRouter.get("/:id/album", login_inspect, album);
tripRouter.route("/:id/:id").get(login_inspect, getPhoto).post(postPhoto);

export default tripRouter;
