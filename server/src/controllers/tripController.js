import Image from "../../database/image.js";
import User from "../../database/User.js";

export const world = (req, res) => {
  return res.render("ejs/world/world.ejs");
};

export const home = (req, res) => {
  const { nickname } = req.session;

  return res.render("pug/album/home.pug", { nickname });
};

export const album = async (req, res) => {
  const { userId, nickname } = req.session;
  const exist = await Image.exists({ user: userId });

  if (exist) {
    const { file } = await Image.findOne({ user: userId }).populate("file");

    return res.render("pug/album/album.pug", { file, nickname });
  } else {
    return res.render("pug/album/album.pug");
  }
};

export const getPhoto = async (req, res) => {
  const {
    session: { nickname },
    params: { id },
  } = req;

  // 현재 게시물 작성자
  const ownedUser = req.url.split("/")[1];
  const { _id, profileImg } = await User.findOne({ nickname: ownedUser });

  // 댓글 작성자의 정보 받기
  const user = await User.findOne({ nickname });
  const myProfile = user.profileImg;

  // 댓글 입력했을 때 게시물 바로 찾기 위해서
  req.session.postId = _id;

  // 접근한 게시물의 파일 정보
  const { file } = await Image.findOne({ user: _id });

  // 접근할 게시물의 제목, 문구, 이미지 파일 및 댓글, 다른 게시물 정보 가져오기
  const { title, description, imageFile, comments } = file.find(
    (i) => i.fileId === id
  );
  const anotherFile = file.filter((i) => i.fileId !== id);

  if (imageFile.length !== 0) {
    return res.render("pug/album/photo.pug", {
      myProfile,
      profileImg,
      title,
      ownedUser,
      description,
      nickname,
      imageFile,
      comments,
      anotherFile,
    });
  } else {
    return res.render("pug/error/404.pug");
  }
};

export const postPhoto = async (req, res) => {
  const {
    session: { userId, postId },
    body: { text },
    params: { id },
  } = req;

  // 로그인(댓글 작성) 유저 정보 조회
  const { profileImg, nickname } = await User.findById(userId);

  // 댓글 작성한 게시물 id 조회
  const imagePost = await Image.findOne({ user: postId });
  const { file } = imagePost;
  const findId = file.find((i) => i.fileId === id);

  // 현재 시간
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  // 댓글 정보
  // 댓글은 ajax 를 통한 비동기적 방식을 사용
  const comment = {
    profileImg,
    author: nickname,
    text,
    createAt: `${year}/${month}/${date} · ${hours}${minutes}`,
  };

  // 댓글 정보 DB 업로드
  findId.comments.unshift(comment);
  imagePost.save();

  return res.json(comment);
};

export const getProfile = async (req, res) => {
  // header 에서 사용할 프로필 url 주소
  const { nickname } = req.session;
  // 현재 유저 프로필 url 주소
  const name = req.url.split("/")[1];

  // 접속한 url 의 회원정보 고유 id 를 찾고, 일치하는 고유 id 의 업로드 파일 찾기
  const user = await User.findOne({ nickname: name });
  const upload = await Image.findOne({ user: user._id });

  // 로그인 한 계정의 프로필인 경우 true 아니면 false
  const owned = user.nickname === nickname ? true : false;

  // 업로드 한 파일이 존재하면 file 값 전달
  if (upload) {
    const { file } = upload;
    return res.render("pug/album/profile.pug", {
      nickname,
      name,
      user,
      owned,
      file,
    });
  } else {
    return res.render("pug/album/profile.pug", { nickname, name, user, owned });
  }
};

export const getUpload = (req, res) => {
  return res.render("pug/album/upload.pug");
};

export const postUpload = async (req, res) => {
  const {
    files,
    session: { userId },
    body: { title, phrases, openPost },
  } = req;

  let upload_file_array = [],
    new_file = [];

  const userId_exist = await Image.exists({ user: userId });

  // 업로드 할 이미지의 유무
  if (files) {
    // 중복되지 않는 고유 값으로 url 에 해당 정보를 주기 위함
    const fileId = new Date().getTime().toString(36);

    // 업로드 시 files 안의 이미지 파일 정보를 배열에 담기
    files.forEach((img) => {
      upload_file_array.push(img.filename);
    });

    // 업로드 파일에 대한 정보
    new_file = [
      {
        fileId,
        title,
        description: phrases,
        public: openPost,
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
