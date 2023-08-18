import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Базовый URL API
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});