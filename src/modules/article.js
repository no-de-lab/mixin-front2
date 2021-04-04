import { action, observable } from 'mobx';
import { Article } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';

export const initialArticle = {
  articles: [],
};

/*
  stores/decorator.js와 같은 스토어이나 decorator 대신 makeAutoObservable을 사용했습니다.ㄴ
*/

class ArticleStore {
  @observable articles

  constructor(initialData = initialArticle) {
    this.articles = initialData?.articles;
  }

  @action async fetchArticles() {
    const [res, err] = await handleAsync(Article.all());

    if (res) {
      this.articles = res.data;
    }

    return [err === undefined, err];
  }
}

export default ArticleStore;
