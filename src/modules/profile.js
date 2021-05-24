import { action, observable } from 'mobx';
import { Profile } from '@/utils/api';
import { handleAsync } from '@/utils/mobx';

export const initialProfile = {
  stacks : [],
  occupations: []
};

class ProfileStore {
  @observable Profile

  constructor(initialData = initialProfile) {
  }
  @action async getOptions(type) {
    const [res, err] = await handleAsync(Profile.options(type));
    this[type] = res.data;
    return [err === undefined, err];
  }
}

export default ProfileStore;