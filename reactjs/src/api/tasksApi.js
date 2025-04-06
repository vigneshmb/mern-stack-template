import axiosWrap from './axiosWrap';

export const createTask = (data) => axiosWrap.post('/tasks/create', data);

export const getAlltasks = () => axiosWrap.get('/tasks/getAll');
