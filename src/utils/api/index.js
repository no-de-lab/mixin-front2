import createAxios from './config';

const axios = createAxios();

export const Auth = {
  login: ({ provider, accessToken }) => axios.post('/api/user/login', { provider, accessToken }),
  register: (name, email, password) => axios.post('/api/user/register', { name, email, password }),
};

export const Article = {
  all: () => axios.get('/api/articles/search?page=1&offset=10'),
};
