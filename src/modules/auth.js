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

  @action async login({ provider, res }) {
    // NOTE : Error handling 
    const [login, err] = await handleAsync(Auth.login({ provider, accessToken: res.tokenId }));
    const {token, userAccountId} = login.data;
    if(token) {
      Cookies.set('userInfo', login.data.token, { expires: 1 })
      const [auth, authErr] = await handleAsync(Auth.info());
      this.setAuth(auth.data);
    } else {
      const [register, registerErr] = await this.register({
        name : res?.profileObj?.name, 
        email : res?.profileObj?.email, 
        imgUrl: res?.profileObj?.imageUrl, 
        userAccountId
      });
      Cookies.set('userInfo', register.data.token, { expires: 1 })
      this.setAuth(register.data.user);
    }
    return [err === undefined, err];
  }
  async register({name, email, imgUrl, userAccountId}) {
    const [res, err] = await handleAsync(Auth.register({ name, email, imgUrl, userAccountId }));
    return [res, err];
  }

  @action async info() {
    const [auth, err] = await handleAsync(Auth.info());
    this.setAuth(auth.data);
    return [err === undefined, err];
  }
 
  @action setAuth(auth) {
    if(!auth) return;
    this.user = auth;
    this.loaded = true;
  }
}

export default UserStore;
