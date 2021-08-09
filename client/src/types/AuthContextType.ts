import RegisterData from './RegisterData';
import User from './User';
import LoginData from './LoginData';
import { AxiosError } from 'axios';
export default interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: AxiosError;
  register: (registerData: RegisterData) => void;
  login: (loginData: LoginData) => void;
  logOut: () => void;
}
