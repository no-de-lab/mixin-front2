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
  }

  @action async signIn({ email, password }) {
    const [res, err] = await handleAsync(Auth.signIn({ email, password }));
  }

  @action async info() {
    const [auth, err] = await handleAsync(Auth.info());
    this.setAuth(auth?.data);
    return [err === undefined, err];
  }
}

export default UserStore;
