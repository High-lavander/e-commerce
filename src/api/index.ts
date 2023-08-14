import axios from 'axios';

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}app_id=${process.env.REACT_APP_API_ID}`,
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
