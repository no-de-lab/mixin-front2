import { action, observable } from 'mobx';
import { Auth } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';

export const initialAuth = {
  user: [],
};

/*
  stores/decorator.js와 같은 스토어이나 decorator 대신 makeAutoObservable을 사용했습니다.ㄴ
*/

class UserStore {
  @observable user

  constructor(initialData = initialAuth) {
    this.user = initialData?.user;
    this.loaded = false;
  }

  @action async login({ provider, accessToken }) {
    const [res, err] = await handleAsync(Auth.login({ provider, accessToken }));
    return [err === undefined, err];
  }

  @action setAuth(user) {
    this.user = user;
    this.loaded = true;
  }
}

export default UserStore;
