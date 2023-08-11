import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/${process.env.REACT_APP_API_PROJECT_KEY}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  params: {
    app_key: process.env.REACT_APP_API_KEY,
  },
});

// const registrationApi = axios.create({
//   baseURL: `/${process.env.REACT_APP_API_AUTH_URL}/oauth/${process.env.REACT_APP_API_PROJECT_KEY}/customers/token?grant_type=password&username=${username}&password=${password}`,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   },
//   withCredentials: true,
//   params: {
//     app_key: process.env.REACT_APP_API_KEY,
//   },
// });
const username = 'user name';
const password = '1234qwer';
const token = 'somerandomtoken';
const registrationConfig: AxiosRequestConfig = {
  baseURL: `/${process.env.REACT_APP_API_AUTH_URL}/oauth/${process.env.REACT_APP_API_PROJECT_KEY}/customers/token?grant_type=password&username=${username}&password=${password}`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const registrationApi = axios.create(registrationConfig);

export const registration = async (email: string, password: string) => {
  const { data } = await http.post(
    `/${process.env.REACT_APP_API_AUTH_URL}/oauth/${process.env.REACT_APP_API_PROJECT_KEY}/customers/token?grant_type=password&username=${username}&password=${password}`,
    { email, password }
  );
  localStorage.setItem('token', data.token);
  return data;
};

// const authInterceptor = (config: AxiosRequestConfig) => {
//   config.headers!.authorization = `Bearer ${localStorage.getItem('token')}`;
//   return config;
// };

// registrationApi.interceptors.request.use(authInterceptor);

export { http, registrationApi };
