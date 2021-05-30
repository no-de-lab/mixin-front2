import CONFIG from '@/utils/config/AppConfig';
import Cookies from 'js-cookie';
import axios from 'axios';

export const createAxios = (axiosConfig) => axios.create({
  timeout: CONFIG.REQUEST_TIME_OUT,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    Authorization: Cookies.get('userInfo'),
  },
  ...axiosConfig,
});

export const createServerAxios = (axiosConfig) => axios.create({
  timeout: CONFIG.REQUEST_TIME_OUT,
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  ...axiosConfig,
});
