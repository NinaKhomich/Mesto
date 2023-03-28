export default class UserInfo {
  constructor(profileNameSelector, profileJobSelector) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileJobElement = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._profileNameElement.textContent,
      job: this._profileJobElement.textContent
    }

    return userInfo;
  }

  setUserInfo(dataUserInfo) {
    this._profileNameElement.textContent = dataUserInfo.name;
    this._profileJobElement.textContent = dataUserInfo.job;
  }
}