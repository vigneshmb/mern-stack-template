import axiosWrap from './axiosWrap';

export const loginUser = (data) => axiosWrap.post('/users/login',data);
export const getUser = () => axiosWrap.get('/users/getMe');

export const logoutUser = () => axiosWrap.get('/users/logout');
