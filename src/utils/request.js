import axios from 'axios'
import {Message} from 'element-ui'
import {getToken, getUsername} from '@/utils/app.js'

// const BASEURL = process.env.NODE_ENV === "production"? "": '/devApi';
const service = axios.create({
  // baseURL: BASEURL,
  baseURL: '/api',
  timeout:15000
});


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么(在请求头添加参数)
    config.headers['Tokey'] = getToken();
    config.headers['Username'] = getUsername();

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    if(data.resCode !== 0){
      Message.error(data.message)
      return Promise.reject(data);
    }else{
      return response;
    }


    // return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// 设置默认暴露
export default service;