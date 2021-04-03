import createAxios from './config';

const axios = createAxios();

export const Auth = {
  signIn: ({ email, password }) => axios.post('/user/sign_in', { email, password }),
  register: (name, email, password) => axios.post('/user/register', { name, email, password }),
};

export const Article = {
  all: () => axios.get('/articles'),
};
