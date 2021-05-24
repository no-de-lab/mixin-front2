import createAxios from './config';

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
  all: () => axios.get('/api/articles/search?page=1&offset=10'),
};
