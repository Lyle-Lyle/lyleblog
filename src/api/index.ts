import axios, { AxiosError } from 'axios';
import config from '@/config.json';
import { message } from 'antd';
import useAppStore from '@/store/app-store';
import { resetAllStore } from '@/store/resetters';

const instance = axios.create({
  // timeout: 1000,
  baseURL: config.baseURL,
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded',
  //   'x-api-key': 'ab428ee8-c6ae-4bee-86ca-a5bd3437cff5',
  // },
});

instance.interceptors.request.use(
  function (config) {
    // config.transformRequest = () => {
    //   return qs.stringify({ name: 'lyle', age: 22 });
    // };
    // const url = config.url;
    // const method = config.method?.toUpperCase();
    // 判断是否需要 formData格式的数据
    // if (
    //   (url === '/my/article/add' && method == 'POST') ||
    //   (url === '/my/article/info' && method === 'PUT')
    // ) {
    //   config.transformRequest = [];
    // } else {
    //   config.transformRequest = requestTransformer;
    // }

    // 为请求头按需挂载 token
    const token = useAppStore.getState().token;
    console.log('mounted token');
    console.log(token);
    // if (url?.includes('/') && token) {
    //   config.headers.Authorization = 'Bearer ' + token;
    // }
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data) {
      // 有响应体的情况
      return response.data;
    } else {
      // 没有响应体，则自定义一个标准的响应体，并返回
      return { code: 0, message: response.statusText };
    }
  },
  function (error: AxiosError<{ code: number; message: string }>) {
    if (error.response && error.response.data) {
      // 有响应体的情况
      if (error.response.status === 401) {
        if (useAppStore.getState().token) {
          // token 过期了
          message.error('Please login first!');
          // 清空 store
          resetAllStore();
        }
      } else {
        message.error(error.response.data.message);
      }
      return Promise.reject(error.response.data);
    } else {
      // 2. 无响应体：
      // 定义错误的提示消息
      let msg = '';
      // 判断错误类型，设置不同的错误消息
      switch (error.code) {
        case 'ERR_NETWORK':
          msg = 'Check your Internet connection...';
          break;
        case 'ECONNABORTED':
          msg = 'Timeout...';
          break;
        default:
          msg = error.message;
          break;
      }
      // 展示错误消息
      message.error(msg);
    }
    return Promise.reject({ code: 1, message: error.message });
  }
);

// const requestTransformer: AxiosRequestTransformer = (data) => {
//   if (data instanceof FormData) {
//     return qs.stringify(Object.fromEntries(data));
//   } else {
//     return qs.stringify(data);
//   }
// };

export default instance;
