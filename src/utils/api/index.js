import CONFIG from '../config/AppConfig';
import createAxios from './config';
import qs from 'qs';

const axios = createAxios();

export const Auth = {
  signIn: ({ email, password }) => axios.post('/user/sign_in', { email, password }),
  register: (name, email, password) => axios.post('/user/register', { name, email, password }),
};

export const Article = {
  all: ({search, page, offset}) => {
    const queryString = qs.stringify({
      page: page || 1,
      offset: offset || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
    });

    return axios.get(`/api/articles/search?${queryString}`)
  },
};

export const Developer = {
  all: (page) => axios.get(`https://api.mix-in.net/api/dashboard?page=${page}`),
};
