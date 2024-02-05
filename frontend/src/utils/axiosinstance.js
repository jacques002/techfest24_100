import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND,
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        window.location = '/';
    }
    return Promise.reject(error);
});

export default axiosInstance;