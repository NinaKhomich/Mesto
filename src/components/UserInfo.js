export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector, profileAvatarSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileJobElement = document.querySelector(profileJobSelector);
    this._avatar = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileNameElement.textContent,
      about: this._profileJobElement.textContent
    }

    return userInfo;
  }

  setUserInfo(dataUserInfo) {
    this._profileNameElement.textContent = dataUserInfo.name;
    this._profileJobElement.textContent = dataUserInfo.about;
  }

  setUserAvatar(dataUserInfo) {
    this._avatar.src = dataUserInfo.avatar;
  }
}