import Image from "../../database/image.js";
import User from "../../database/User.js";
import Video from "../../database/video.js";

export const home = (req, res) => {
  const { nickname } = req.session;

  return res.render("pug/album/home.pug", { nickname });
};

export const getPhoto = async (req, res) => {
  const {
    session: { nickname },
    params: { id },
  } = req;

  // 현재 게시물 작성자
  const ownedPostUser = req.url.split("/")[1];
  // 게시물 소유자인지, 방문자인지 검사
  const owned = nickname === ownedPostUser ? true : false;
  const { _id, profileImg } = await User.findOne({ nickname: ownedPostUser });

  // 본인의 댓글 프로필 이미지 정보 받기
  const user = await User.findOne({ nickname });
  const myProfile = user.profileImg;

  // 댓글 입력했을 때 작성자 게시물 바로 찾기 위해서
  req.session.postId = _id;
  try {
    // fileId 가 이미지 파일인지 검사
    // 오류 발생 시 비디오 파일 검사
    try {
      const { file } = await Image.findOne({ user: _id });
      const { title, description, imageFile, like, comments } = file.find(
        (i) => i.fileId === id
      );

      // 게시물 작성자의 또 다른 게시물
      const anotherFile = file.filter((i) => i.fileId !== id);

      const post = {
        owned, // 게시물 소유자 또는 방문자인지 확인
        myProfile, // 내 유저 프로필 이미지
        postProfileImg: profileImg, // 게시물 작성자의 프로필 이미지
        title, // 이미지 제목
        ownedPostUser, // 게시물 작성자 닉네임
        description, // 이미지 설명
        like, // 게시물의 좋아요 수
        imageFile, // 이미지 파일(배열)
        comments, // 작성된 댓글(배열)
        anotherFile, // 게시물 작성자의 또 다른 게시물
      };

      const image = true;
      const video = false;

      return res.render("pug/album/photo.pug", {
        image,
        video,
        post,
        nickname,
      });
    } catch {
      const { file } = await Video.findOne({ user: _id });
      const { title, description, videoFile, like, comments } = file.find(
        (i) => i.fileId === id
      );

      const anotherFile = file.filter((i) => i.fileId !== id);

      const post = {
        owned, // 게시물 소유자 또는 방문자인지 확인
        myProfile, // 내 유저 프로필 이미지
        postProfileImg: profileImg, // 게시물 작성자의 프로필 이미지
        title, // 비디오 제목
        ownedPostUser, // 게시물 작성자 닉네임
        description, // 비디오 설명
        like, // 게시물의 좋아요 수
        videoFile, // 비디오 파일
        comments, // 작성된 댓글(배열)
        anotherFile, // 게시물 작성자의 또 다른 게시물
      };

      const image = false;
      const video = true;

      return res.render("pug/album/photo.pug", {
        image,
        video,
        post,
        nickname,
      });
    }
  } catch {
    return res.render("pug/error/404.pug");
  }
};

export const postPhoto = async (req, res) => {
  const {
    session: { userId, postId },
    body: { text },
    params: { id },
  } = req;

  // 댓글 작성자(본인) 유저 정보 조회
  const { profileImg, nickname } = await User.findById(userId);

  // 현재 시간
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();

  // 댓글 정보(ajax 사용)
  const comment = {
    profileImg,
    author: nickname,
    text,
    createAt: `${year}/${month}/${date} · ${hours}:${minutes}`,
  };

  try {
    // 댓글 작성한 게시물 id 조회
    const post = await Image.findOne({ user: postId });
    const { file } = post;
    const findId = file.find((i) => i.fileId === id);

    // 댓글 정보 DB 업로드
    findId.comments.unshift(comment);
    post.save();

    return res.json(comment);
  } catch {
    const post = await Video.findOne({ user: postId });
    const { file } = post;
    const findId = file.find((i) => i.fileId === id);

    // 댓글 정보 DB 업로드
    findId.comments.unshift(comment);
    post.save();

    return res.json(comment);
  }
};

export const profileImage = async (req, res) => {
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
      images: file,
    });
  } else {
    return res.render("pug/album/profile.pug", { nickname, name, user, owned });
  }
};

export const profileVideo = async (req, res) => {
  // header 에서 사용할 프로필 url 주소
  const { nickname } = req.session;
  // 현재 유저 프로필 url 주소
  const name = req.url.split("/")[1];

  // 접속한 url 의 회원정보 고유 id 를 찾고, 일치하는 고유 id 의 업로드 파일 찾기
  const user = await User.findOne({ nickname: name });
  const upload = await Video.findOne({ user: user._id });

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
      videos: file,
    });
  } else {
    return res.render("pug/album/profile.pug", { nickname, name, user, owned });
  }
};

export const getUpload = (req, res) => {
  return res.render("pug/album/upload.pug");
};

export const postVideoUpload = async (req, res, next) => {
  const {
    files,
    session: { userId, nickname },
    body: { title, phrases, openPost },
  } = req;

  // 비디오 타입으로 업로드를 했을 경우
  if (files[0].mimetype === "video/mp4") {
    const userId_exist_video = await Video.exists({ user: userId });

    // 중복되지 않는 고유 값으로 url 에 해당 정보를 주기 위함
    const fileId = new Date().getTime().toString(36);

    let videoFile = {
      fileId,
      title,
      description: phrases,
      public: openPost,
      videoFile: files[0].filename,
    };

    // 계정의 비디오 데이터베이스 존재 유무
    if (userId_exist_video) {
      let { file } = await Video.findOne({ user: userId });
      file.unshift(videoFile);

      await Video.findOneAndUpdate({ user: userId }, { file });

      return res.redirect(`/trip/${nickname}`);
    } else {
      await Video.create({
        user: userId,
        file: [videoFile],
      });

      return res.redirect(`/trip/${nickname}`);
    }
  }

  return next();
};

export const postImageUpload = async (req, res) => {
  const {
    files,
    session: { userId, nickname },
    body: { title, phrases, openPost },
  } = req;

  let upload_file_array = [],
    new_file = [];

  const userId_exist_image = await Image.exists({ user: userId });

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
  if (userId_exist_image) {
    let { file } = await Image.findOne({ user: userId });
    file.unshift(...new_file);

    await Image.findOneAndUpdate({ user: userId }, { file });
  } else {
    await Image.create({
      user: userId,
      file: new_file,
    });
  }

  return res.redirect(`/trip/${nickname}`);
};
