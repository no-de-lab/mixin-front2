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
  one: ({articleId}) => axios.get(`/api/v2/article/${articleId}`), 

  authOne: ({articleId}) => axios.get(`/api/v2/article/${articleId}/me`), 

  all: ({search, page, size, sort}) => {
    const queryString = qs.stringify({
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
      sort: sort || "created_at"
    });

    return axios.get(`/api/v2/articles?${queryString}`)
  },

  authAll: ({search, page, size, sort}) => {
    const queryString = qs.stringify({
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
      sort: sort || "created_at"
    });

    return axios.get(`/api/v2/articles/me?${queryString}`)
  },
  
  bookmark: ({ articleId }) => axios.post(`/api/v2/article/${articleId}/bookmark`),

  unbookmark: ({ articleId }) => axios.delete(`/api/v2/article/${articleId}/bookmark`),

  getComments: ({articleId}) => axios.get(`/api/v2/article/${articleId}/comments`), 
  
  addComment: ({comment, articleId}) => axios.post('/api/v2/article/comment', { comment, articleId }),

  deleteComment: ({commentId}) => axios.delete('/api/v2/article/comment', { commentId }),
  
  editComment: ({commentId}) => axios.put(`/api/v2/article/comment/${commentId}`, { commentId, comment, articleId }),
};

export const Developer = {
  all: (page) => axios.get(`/api/dashboard?page=${page}`),
};
