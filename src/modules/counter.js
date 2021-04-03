import { makeAutoObservable } from 'mobx';

export const initialCounter = {
  count: 0,
};

class CounterStore {
  count = 0

  constructor(initialData = initialCounter) {
    // makeAutoObservable로 클래스의 프로퍼티와 메서드에 알아서
    // @observable, @action decorator를 매핑합니다.
    this.count = initialData.count;
    makeAutoObservable(this);
  }

  setCount = (count) => {
    this.count = count;
  }
}

export default CounterStore;
