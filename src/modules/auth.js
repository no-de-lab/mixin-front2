import { action, observable } from 'mobx';
import { Article, Auth } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';

export const initialAuth = {
  user: [],
  articles: [],
};

/*
  stores/decorator.js와 같은 스토어이나 decorator 대신 makeAutoObservable을 사용했습니다.ㄴ
*/

class UserStore {
  @observable use

  @observable articles

  constructor(initialData = initialAuth) {
    this.user = initialData?.user;
    this.articles = initialData?.articles;
  }

  @action async signIn({ email, password }) {
    const [res, err] = await handleAsync(Auth.signIn({ email, password }));

    if (res) {
      this.user = res.data;
    }
    return [err === undefined, err];
  }

  @action async fetchArticles() {
    const [res, err] = await handleAsync(Article.all());

    if (res) {
      this.articles = res.data;
    }

    return [err === undefined, err];
  }
}

export default UserStore;
