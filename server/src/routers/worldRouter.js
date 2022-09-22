import express from "express";
import multer from "multer";
import {
  world,
  asia_land,
  korea,
  europe_land,
  getUpload,
  postUpload,
} from "../controllers/worldController.js";

// 확장자에 따른 저장 폴더 구분 및 이름 변경
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      cb(null, "file/upload/image/");
    } else if (file.originalname.match(/\.(mp4|glf)$/)) {
      cb(null, "file/upload/video/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const worldRouter = express.Router();

worldRouter.get("/", world);

worldRouter.get("/asia", asia_land);
worldRouter.get("/asia/korea", korea);

worldRouter.get("/europe", europe_land);

worldRouter
  .route("/upload")
  .get(getUpload)
  .post(upload.array("upload_file"), postUpload);

export default worldRouter;
