export default class UserInfo {
    constructor(username, about, avatar) {
      this._userName = document.querySelector(username);
      this._userAbout = document.querySelector(about);
      this._userAvatar = document.querySelector(avatar);
      this._userId = "";
    }
  
    getUserInfo() {
    return {
        name: this._userName.textContent,
        about: this._userAbout.textContent,
        avatar: this._userAvatar.src,
        userId: this._userId,
        };
    }
  
    setUserInfo(name, about, avatar, _id) {
      this._userName.textContent = name;
      this._userAbout.textContent = about;
      this._userAvatar.src = avatar;
      this._userId = _id;
    }
  }