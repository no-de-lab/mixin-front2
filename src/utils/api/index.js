import CONFIG from '../config/AppConfig';
import { createAxios, createServerAxios } from './config';
import qs from 'qs';


const isServer = typeof window === 'undefined';

const axios = isServer ? createServerAxios() : createAxios();

export const Auth = {
  login: ({ provider, accessToken }) => axios.post('/api/user/login', { provider, accessToken }),
  register: ({ name, email, imgUrl, userAccountId }) => axios.post('/api/user/register', { name, email, imgUrl, userAccountId }),
  info: async () => axios.post('/api/user/me'),
};

export const Profile = {
  options: (type) => axios.get(`/api/user/${type}`),
};

export const Article = {
  one: ({ articleId }) => axios.get(`/api/v2/article/${articleId}`),

  authOne: ({ articleId }) => axios.get(`/api/v2/article/${articleId}/me`),

  all: ({ search, page, size, sort }) => {
    const queryString = qs.stringify({
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
      sort: sort || "created_at"
    });

    return axios.get(`/api/v2/articles?${queryString}`)
  },

  authAll: ({ search, page, size, sort }) => {
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

  getComments: ({ articleId }) => axios.get(`/api/v2/article/${articleId}/comments`),

  addComment: ({ comment, articleId }) => axios.post('/api/v2/article/comment', { comment, articleId }),

  deleteComment: ({ commentId }) => axios.delete(`/api/v2/article/comment/${commentId}`),

  editComment: ({ commentId }) => axios.put(`/api/v2/article/comment/${commentId}`, { commentId, comment, articleId }),
};

export const Developer = {
  all: (page) => axios.get(`/api/dashboard?page=${page}`),
  authAll: (page) => axios.get(`/api/dashboard/me?page=${page}`),
  bookmarkDeveloper: ({ targetId }) => axios.patch(`/api/dashboard/bookmark/${targetId}`),
  getBookmarkDeveloper: () => axios.get(`/api/dashboard/me`),
};

export const Qna = {
  register: ({ registerData }) => axios.post(`/api/v1/qna/registration`, registerData),
  one: ({ qnaId }) => axios.get(`/api/v1/qna/${qnaId}`),
  edit: ({ qnaId, editData }) => axios.put(`/api/v1/qna/${qnaId}`, editData),
  delete: ({ qnaId }) => axios.delete(`/api/v1/qna/${qnaId}`),
  authOne: ({ qnaId }) => axios.get(`/api/v1/qna/me/${qnaId}`),
  all: ({ search, page, size, sort }) => {
    const queryString = qs.stringify({
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
      sort: sort || "created_at"
    });

    return axios.get(`/api/v1/qnas?${queryString}`)
  },
  authAll: ({ search, page, size, sort }) => {
    const queryString = qs.stringify({
      page: page || 1,
      size: size || CONFIG.INFINITE_SCROLL_OFFSET,
      search: search || undefined,
      sort: sort || "created_at"
    });

    return axios.get(`/api/v1/qnas/me?${queryString}`)
  },
  like: ({ qnaId }) => axios.post(`/api/v1/qna/${qnaId}/like`),
  unlike: ({ qnaId }) => axios.delete(`/api/v1/qna/${qnaId}/like`),
  bookmark: ({ qnaId }) => axios.post(`/api/v1/qna/${qnaId}/bookmark`),
  unbookmark: ({ qnaId }) => axios.delete(`/api/v1/qna/${qnaId}/bookmark`),
  likeComment: ({ commentId }) => axios.get(`/api/v1/qna/comment/${commentId}/like`),
  comment: (registerData) => axios.post(`/api/v1/qna/comment`, registerData),
  editComment: ({ commentId, editData }) => axios.put(`/api/v1/qna/comment/${commentId}`, editData),
  deleteComment: ({ commentId }) => axios.delete(`/api/v1/qna/comment/${commentId}`),
  commentsAll: ({ qnaId }) => axios.get(`/api/v1/comments/${qnaId}`),
  commentsAuthAll: ({ qnaId }) => axios.get(`/api/v1/me/comments/${qnaId}`),
}
