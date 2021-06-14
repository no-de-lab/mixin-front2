import { Developer } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';
import { action, observable } from 'mobx';

export const initialDeveloper = {
  developerList: [],
  developer: {},
};

class DeveloperStore {
  @observable developerList

  constructor(initialData = initialDeveloper) {
    this.developerList = initialData?.developerList;
  }

  @action setDeveloper(developer) {
    this.developer = developer;
  }

  @action async fetchDeveloperList(page) {
    const [res, err] = await handleAsync(Developer.all(page));

    if (res) {
      this.developerList = res.data;
    }

    return [err === undefined, err];
  }
}

export default DeveloperStore;
