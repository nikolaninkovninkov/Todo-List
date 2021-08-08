import RegisterData from '../types/RegisterData';
import axios, { AxiosRequestConfig } from 'axios';
import timeout from '../utils/timeout';
async function register(registerData: RegisterData) {
  const axiosOptions: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.REACT_APP_NODE_SERVER + '/api/users/register',
    data: registerData,
  };
  const response = await axios(axiosOptions);
  // await timeout(10000);
  return response;
}
export { register };
