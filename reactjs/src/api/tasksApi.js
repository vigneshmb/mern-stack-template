import axiosWrap from './axiosWrap';

export const createTask = (data) => axiosWrap.post('/tasks/create', data);

export const getAlltasks = () => axiosWrap.get('/tasks/getAll');
export const getTaskByID = (taskId) => axiosWrap.get(`/tasks/get/${taskId}`);

export const updateTaskByID = (taskId, data) =>
  axiosWrap.put(`/tasks/update?taskId=${taskId}`, data);
export const updateTaskStatusByID = (taskId, data) =>
  axiosWrap.patch(`/tasks/change-status?taskId=${taskId}`, data);

export const deleteTaskByID = (taskId) =>
  axiosWrap.delete(`/tasks/delete/${taskId}`);
