import {easyRequest} from '../utils/RequestUtil';
import Apis from '../utils/ApiTypeUtil';
import {action, makeObservable, observable, runInAction} from 'mobx';

const num = 10;

export default class HomeStore {
  constructor() {
    makeObservable(this);
  }

  page = 1;
  @observable homeList = [];
  @observable refreshing = false;

  @action
  Refresh = () => {
    runInAction(() => {
      this.page = 1;
      this.requestHomeList();
    });
  };

  @action
  requestHomeList = async () => {
    if (this.refreshing) {
      return;
    }
    this.refreshing = true;
    try {
      let params = {
        page: this.page,
        size: num,
      };
      const {data} = await easyRequest(Apis.home, params);
      if (data?.length) {
        runInAction(() => {
          if (this.page === 1) {
            this.homeList = data;
          } else {
            this.homeList = [...this.homeList, ...data];
          }
        });
        this.page = this.page + 1;
        console.log(this.page);
      } else {
        if (this.page === 1) {
          this.homeList = [];
        }
      }
    } catch (e) {
      console.log('error:' + e);
      return e;
    } finally {
      runInAction(() => {
        this.refreshing = false;
      });
    }
  };
}
