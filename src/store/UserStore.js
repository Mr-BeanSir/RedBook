import {save} from '../utils/Storage';

class UserStore {
  UserInfo = {};

  setUserInfo = data => {
    save('account', JSON.stringify(data));
    this.UserInfo = data;
  };
}

export default new UserStore();
