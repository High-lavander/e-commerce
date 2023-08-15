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

// export const login = async (username: string, password: string) => {
//   const { data } = await http.post(
//     `/${process.env.REACT_APP_API_AUTH_URL}/oauth/${process.env.REACT_APP_API_PROJECT_KEY}/customers/token?grant_type=password&username=${username}&password=${password}`
//   );
//   localStorage.setItem('token', data.token);
//   return data;
// };

export const login = async (email: string, password: string) => {
  const { data } = await http.post(`/${process.env.REACT_APP_API_HOST}/${process.env.REACT_APP_API_KEY}/login`, {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return data;
};

// export const registration = async (email: string, password: string) => {
//   const { data } = await http.post(`/${process.env.REACT_APP_API_AUTH_URL}/oauth/token?grant_type=client_credentials`, {
//     email,
//     password,
//   });
//   localStorage.setItem('token', data.token);
//   return data;
// };

export const registrationCustomer = async (firstName: string, lastName: string, email: string, password: string) => {
  const { data } = await axios.post(
    `https://api.${process.env.REACT_APP_API_REGION}.commercetools.com/${process.env.REACT_APP_API_PROJECT_KEY}/customers `,
    {
      firstName,
      lastName,
      email,
      password,
      withCredentials: true,
    }
  );
  localStorage.setItem('token', data.token);
  return data;
};

export const getAnonymousSessionToken = async () => {
  try {
    // const response = await axios.post(
    //   `${import.meta.env.VITE_CTP_API_URL}/oauth/${
    //     import.meta.env.VITE_CTP_PROJECT_KEY
    //   }/anonymous/token?grant_type=client_credentials`,
    //   undefined,
    //   {
    //     // withCredentials: true,
    //     headers: {
    //       Authorization: `Basic ${import.meta.env.VITE_CTP_CLIENT_ID}${import.meta.env.VITE_CTP_CLIENT_SECRET}`,
    //     },
    //   }
    // );
    // localStorage.setItem('token', data.token);

    const response = await fetch(
      `/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
          Authorization: 'Basic c3ZTMHBNQnFCZ3NBdm80WUhVUlpJWTVqOmZXUnpnV2FFeEFWTFM1b3V3a3NzYXJxRlNwTlA1cHFw',
          // 'Access-Control-Allow-Headers': '*',
          // 'Access-Control-Expose-Headers': '*',
          // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          // 'Access-Control-Allow-Credentials': '*',
          // 'Access-Control-Allow-Origin':
          // 'https://api.europe-west1.gcp.commercetools.com/oauth/rs-school-e-commerce-app',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const revokeToken = async () => {
  const { data } = await axios.post(`${process.env.REACT_APP_API_HOST}/oauth/token/revoke`, {
    withCredentials: true,
    headers: {
      Authorization: `Basic  ${process.env.REACT_APP_CTP_CLIENT_ID}${process.env.REACT_APP_CTP_CLIENT_SECRET}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data;
};

export const registrationInStore = async (firstName: string, lastName: string, email: string, password: string) => {
  const { data } = await axios.post(
    `https://api.${process.env.REACT_APP_API_REGION}.commercetools.com/${process.env.REACT_APP_API_PROJECT_KEY}/in-store/key=${process.env.REACT_APP_API_STORE_KEY}/customers`,
    {
      firstName,
      lastName,
      email,
      password,
      withCredentials: true,
    }
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
