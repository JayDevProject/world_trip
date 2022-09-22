import Image from "../../database/image.js";
import "express-session";

export const world = (req, res) => {
  res.render("ejs/world/world.ejs");
};

export const asia_land = (req, res) => {
  res.render("ejs/world/asia.ejs");
};

export const korea = (req, res) => {
  console.log(req.originalUrl);
  res.render("pug/album/korea");
};

export const europe_land = (req, res) => {
  res.render("ejs/world/europe.ejs");
};

export const getUpload = (req, res) => {
  res.render("pug/album/upload");
};

export const postUpload = async (req, res) => {
  const {
    files,
    session: { userId },
  } = req;

  let upload_file_array = [],
    new_file = [];

  const userId_exist = await Image.exists({ user: userId });

  // 업로드 할 이미지의 유무
  if (files) {
    // 배열에 담긴 파일의 이름 push
    files.forEach((img) => {
      upload_file_array.push(img.filename);
    });

    new_file = [
      {
        imageFile: upload_file_array,
      },
    ];
  } else {
    // 에러
  }

  // 업로드 된 파일이 없으면 새로 생성, 있으면 배열에 추가
  if (userId_exist) {
    let { file } = await Image.findOne({ user: userId });
    file.unshift(...new_file);

    await Image.findOneAndUpdate({ user: userId }, { file });
  } else {
    await Image.create({
      user: userId,
      file: new_file,
    });
  }
};
