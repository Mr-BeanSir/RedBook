import axios from 'axios';

const request = axios.create({
  baseURL: 'http://192.168.118.214:7001',
});

request.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    const response = err.response;
    if (response) {
      const status = response.status;
      if (status >= 500) {
        return Promise.reject(err);
      } else if (status === 400) {
        return Promise.reject(err);
      } else if (status === 401) {
        return Promise.reject(err);
      }
    } else {
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

const get = (url, params) => {
  return request.get(url, {params});
};

const post = (url, params) => {
  return request.post(url, {params});
};

request.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

/**
 *
 * @param api {Object}
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
const easyRequest = (api, params) => {
  return request({
    url: api.url,
    method: api.type,
    params: params,
  });
};

export {get, post, easyRequest};
