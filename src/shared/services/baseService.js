import axios from 'axios';

const BASE_URL = '/';

const instance = axios.create({
    baseURL: BASE_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

// REQUEST INTERCEPTOR
instance.interceptors.request.use(request => {
    console.log('Request: ', request);
    return request;
}, error => {
    console.error('Error from Request Interceptor: ', error);
    return Promise.reject(error);
});

// RESPONSE INTERCEPTOR
instance.interceptors.response.use(response => {
    console.log('Response: ', response);
    return response;
}, error => {
    console.error('Error from Response Interceptor: ', error);
    return Promise.reject(error);
});

export default instance;