import axiosWrap from './axiosWrap';

export const getAlltasks = () => axiosWrap.get('/tasks/getAll');
