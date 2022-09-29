import express from "express";
import path from "path";
import multer from "multer";
import {
  world,
  land,
  getUpload,
  postUpload,
} from "../controllers/worldController.js";
import { login_inspect } from "../middlewares/loginMiddleware.js";
import { continent } from "../middlewares/worldMiddleware.js";

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

const worldRouter = express.Router();

worldRouter.get("/", login_inspect, world);
worldRouter.get("/:id", login_inspect, continent, land);

worldRouter
  .route("/:id/upload")
  .get(login_inspect, continent, getUpload)
  .post(upload.array("upload_file"), postUpload);

export default worldRouter;
