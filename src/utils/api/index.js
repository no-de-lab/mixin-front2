import CONFIG from '../config/AppConfig';
import createAxios from './config';
import qs from 'qs';

const axios = createAxios();

export const Auth = {
  login: ({ provider, accessToken }) => axios.post('/api/user/login', { provider, accessToken }),
  register: ({name, email, imgUrl, userAccountId}) => axios.post('/api/user/register', { name, email, imgUrl, userAccountId }),
  info: () => axios.post('/api/user/me'),
};

export const Profile = {
  options: (type) => axios.get(`/api/user/${type}`),
};

export const Article = {
  all: ({search, page, offset}) => {
    const queryString = qs.stringify({
      page: page || 1,
      offset: offset || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
    });

    return axios.get(`/api/v2/articles?${queryString}`)
  },
};

export const Developer = {
  all: (page) => axios.get(`/api/dashboard?page=${page}`),
};
