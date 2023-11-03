class UserStore {
  UserInfo = {};

  setUserInfo = data => {
    this.UserInfo = data;
  };
}

export default new UserStore();
