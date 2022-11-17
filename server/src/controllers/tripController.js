import Image from "../../database/image.js";
import "express-session";

export const world = (req, res) => {
  return res.render("ejs/world/world.ejs");
};

export const home = (req, res) => {
  return res.render("pug/album/home.pug");
};

export const album = async (req, res) => {
  const { userId } = req.session;
  const exist = await Image.exists({ user: userId });

  if (exist) {
    const { file } = await Image.findOne({ user: userId }).populate("file");

    return res.render("pug/album/album.pug", { file });
  } else {
    return res.render("pug/album/album.pug");
  }
};

export const getPhoto = async (req, res) => {
  const { userId } = req.session;
  const { id } = req.params;

  const { file } = await Image.findOne({ user: userId });

  const getFile = file.filter((i) => i.fileId === id)[0];
  const anotherFile = file.filter((i) => i.fileId !== id);

  if (getFile.length !== 0) {
    return res.render("pug/album/photo.pug", { getFile, anotherFile });
  } else {
    return res.render("pug/error/404.pug");
  }
};

export const getProfile = (req, res) => {};

export const getUpload = (req, res) => {
  return res.render("pug/album/upload.pug");
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
    // 중복되지 않는 고유 값으로 url 에 해당 정보를 주기 위함
    const fileId = new Date().getTime().toString(36);

    // 배열에 담긴 파일의 이름 push
    files.forEach((img) => {
      upload_file_array.push(img.filename);
    });

    new_file = [
      {
        fileId,
        imageFile: upload_file_array,
      },
    ];
  }

  // 업로드 된 파일이 없으면 새로 생성, 있으면 배열에 추가
  if (userId_exist) {
    let { file } = await Image.findOne({ user: userId });
    file.unshift(...new_file);

    await Image.findOneAndUpdate({ user: userId }, { file });
    // return
  } else {
    await Image.create({
      user: userId,
      file: new_file,
    });

    // return
  }
};
