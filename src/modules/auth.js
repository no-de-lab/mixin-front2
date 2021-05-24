import { action, observable } from 'mobx';
import { Auth } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';
import Cookies from 'js-cookie';
// saveTokenInCookies

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
    this.info();
  }

  @action async login({ provider, accessToken }) {
    const [res, err] = await handleAsync(Auth.login({ provider, accessToken }));

    if(res?.data?.token) {
      Cookies.set('userInfo', res.data.token, { expires: 1 })
      const [auth, err] = await handleAsync(Auth.info());
      this.setAuth(auth);
    }
    return [err === undefined, err];
  }
  @action async register({name, email, imgUrl, userAccountId}) {
    const [res, err] = await handleAsync(Auth.register({ name, email, imgUrl, userAccountId }));
    return [err === undefined, err];
  }

  @action async info() {
    const [auth, err] = await handleAsync(Auth.info());
    this.setAuth(auth);
    return [err === undefined, err];
  }
 
  @action setAuth(auth) {
    if(!auth) return;
    this.user = auth.data;
    this.loaded = true;
  }
}

export default UserStore;
