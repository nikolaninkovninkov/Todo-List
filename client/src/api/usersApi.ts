import RegisterData from '../types/RegisterData';
import axios, { AxiosRequestConfig } from 'axios';
import timeout from '../utils/timeout';
import LoginData from '../types/LoginData';
async function register(registerData: RegisterData) {
  const axiosOptions: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.REACT_APP_NODE_SERVER + '/api/users/register',
    data: registerData,
  };
  const response = await axios(axiosOptions);
  return response;
}
async function login(loginData: LoginData) {
  const axiosOptions: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.REACT_APP_NODE_SERVER + '/api/users/login',
    data: loginData,
  };
  const response = await axios(axiosOptions);
  return response;
}
async function get(token: string) {
  const axiosOptions: AxiosRequestConfig = {
    method: 'GET',
    url: process.env.REACT_APP_NODE_SERVER + '/api/users/auth',
    data: { token },
    headers: { Authorization: 'Bearer ' + token },
  };
  const response = await axios(axiosOptions);
  return response;
}
export { register, get, login };
