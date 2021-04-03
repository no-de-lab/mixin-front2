import { action, observable } from 'mobx';

export const initialCounter = {
  count: 0,
};

/*
  TS에서는 tsconfig 설정을 변경하여 decorator를 지원하도록 할 수 있지만, JS에서는 따로 설정이 없습니다.
  이 프로젝트는 CRA로 만든 프로젝트라 react-app-rewired와 customize-cra를 사용하여 decorator를 지원하도록 했습니다.
  (config-overrides.js 참고)
  ---
  mobx에서 스토어를 정의하는 가장 기본적인 방식입니다.
  다만 decorator 기능이 아직 표준이 아니라, mobx 팀에서도 현재는 make(Auto)Observable을 더 권장합니다.
*/

class CounterStore {
  @observable count = 0

  constructor(initialData = initialCounter) {
    // makeAutoObservable로 클래스의 프로퍼티와 메서드에 알아서
    // @observable, @action decorator를 매핑합니다.
    this.count = initialData.count;
  }

  @action setCount = (count) => {
    this.count = count;
  }
}

export default CounterStore;
