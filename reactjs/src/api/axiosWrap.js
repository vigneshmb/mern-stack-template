import axios from 'axios';

const baseURL = process.env.API_BASEURL || 'http://localhost:4567/api/v1';
const axiosWrap = axios.create({ baseURL });

const token = localStorage.getItem('authJWT') || '';

axiosWrap.defaults.headers.common['authorization'] = `Bearer ${token}`;

axiosWrap.interceptors.response.use(
  (success) => {
    let data = success?.data || {};
    const status = success?.status;
    const headers = success?.headers;
    data = {
      ...data,
      status,
      headers,
    };

    return data;
  },
  (error) => {
    let data = error?.response?.data || {};
    const status = error?.response?.status;
    data = {
      ...data,
      status,
    };
    
    return data;
  },
);

export default axiosWrap;
