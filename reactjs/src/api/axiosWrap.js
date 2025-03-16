import axios from 'axios';

const baseURL = process.env.API_BASEURL || 'http://localhost:4567';
const axiosWrap = axios.create({ baseURL });

// const token = localStorage.getItem("authJWT") || "";

// axiosWrap.defaults.headers.common["Authorization"] = token;

export default axiosWrap;
