import RegisterData from './RegisterData';
import User from './User';

export default interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  register: (registerData: RegisterData) => void;
  logOut: () => void;
}
