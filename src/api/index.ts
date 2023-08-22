import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
  params: {
    app_key: import.meta.env.VITE_CTP_PROJECT_KEY,
  },
});

const username = 'user name';
const password = '1234qwer';
const token = 'somerandomtoken';
const registrationConfig: AxiosRequestConfig = {
  baseURL: `/${import.meta.env.VITE_CTP_API_URL}/oauth/${
    import.meta.env.VITE_CTP_PROJECT_KEY
  }/customers/token?grant_type=password&username=${username}&password=${password}`,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
};

const registrationApi = axios.create(registrationConfig);

export const login = async (email: string, password: string) => {
  const { data } = await http.post(
    `/${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/login`,
    {
      email,
      password,
    }
  );
  localStorage.setItem('token', data.token);
  return data;
};

export const registrationCustomer = async (firstName: string, lastName: string, email: string, password: string) => {
  const { data } = await axios.post(
    `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
      import.meta.env.VITE_CTP_PROJECT_KEY
    }/customers `,
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
    const response = await fetch(
      `/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
          Authorization: 'Basic c3ZTMHBNQnFCZ3NBdm80WUhVUlpJWTVqOmZXUnpnV2FFeEFWTFM1b3V3a3NzYXJxRlNwTlA1cHFw',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const revokeToken = async () => {
  const { data } = await axios.post(`${import.meta.env.VITE_CTP_API_UR}/oauth/token/revoke`, {
    withCredentials: true,
    headers: {
      Authorization: `Basic  ${import.meta.env.VITE_CTP_CLIENT_ID}${import.meta.env.VITE_CTP_CLIENT_SECRET}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return data;
};

export const registrationInStore = async (firstName: string, lastName: string, email: string, password: string) => {
  const { data } = await axios.post(
    `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
      import.meta.env.VITE_CTP_PROJECT_KEY
    }/in-store/key=${import.meta.env.VITE_CTP_PROJECT_KEY}/customers`,
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

export { http, registrationApi };
