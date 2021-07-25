import { action, observable } from 'mobx';
import { Qna } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';

export const initialQna = {
  qna: [],
};

/*
  stores/decorator.js와 같은 스토어이나 decorator 대신 makeAutoObservable을 사용했습니다.ㄴ
*/

class QnaStore {
  @observable qna

  constructor(initialData = initialQna) {
    this.articles = initialData?.articles;
  }

  @action async fetchQna() {
    const [res, err] = await handleAsync(Qna.one());

    if (res) {
      this.articles = res.data;
    }

    return [err === undefined, err];
  }
}

export default QnaStore;
