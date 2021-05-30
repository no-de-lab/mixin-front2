import CONFIG from '../config/AppConfig';
import {createAxios, createServerAxios} from './config';
import qs from 'qs';


const isServer = typeof window === 'undefined';

const axios = isServer ? createServerAxios() : createAxios();

export const Auth = {
  login: ({ provider, accessToken }) => axios.post('/api/user/login', { provider, accessToken }),
  register: ({name, email, imgUrl, userAccountId}) => axios.post('/api/user/register', { name, email, imgUrl, userAccountId }),
  info: () => axios.post('/api/user/me'),
};

export const Profile = {
  options: (type) => axios.get(`/api/user/${type}`),
};

export const Article = {
  all: ({search, page, size, sort}) => {
    const queryString = qs.stringify({
      sort: 'created_at', // FIXME
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined
    });

    return axios.get(`/api/v2/articles?${queryString}`)
  },
};

export const Developer = {
  all: (page) => axios.get(`/api/dashboard?page=${page}`),
};
