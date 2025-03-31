import axios from 'axios';

const baseURL = process.env.API_BASEURL || 'http://localhost:4567/api/v1';
const axiosWrap = axios.create({ baseURL });

const token = localStorage.getItem("authJWT") || "";

axiosWrap.defaults.headers.common["authorization"] = `Bearer ${token}`;

export default axiosWrap;
