import axiosWrap from './axiosWrap';

export const getAllSamples = () => axiosWrap.get('/samples/getAll');
