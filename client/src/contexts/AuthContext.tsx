import { AxiosError } from 'axios';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { get, register, login } from '../api/usersApi';
import useLocalStorage from '../hooks/useLocalStorage';
import AuthContextType from '../types/AuthContextType';
import LoginData from '../types/LoginData';
import RegisterData from '../types/RegisterData';
import User from '../types/User';
const AuthContext = createContext({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useLocalStorage<{ token: string }>('auth-token', {
    token: '',
  });
  const [error, setError] = useState<AxiosError>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  useEffect(() => {
    get(token.token)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error: AxiosError) => {
        setError(error);
      })
      .finally(() => setLoadingInitial(false));
  }, []);
  useEffect(() => {
    setLoading(true);
    if (!token.token) return;
    get(token.token)
      .then((response) => {
        setUser(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);
  function registerController(registerData: RegisterData) {
    const { password, username, email, name } = registerData;

    setLoading(true);
    register(registerData)
      .then((response) => {
        setToken(response.data);
      })
      .catch((error: AxiosError) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function loginController(loginData: LoginData) {
    setLoading(true);
    login(loginData)
      .then((response) => {
        setToken(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function logOutController() {
    setToken({ token: '' });
    setUser(undefined);
  }
  return (
    <AuthContext.Provider
      value={
        {
          user,
          loading,
          error,
          register: registerController,
          login: loginController,
          logOut: logOutController,
        } as AuthContextType
      }
    >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
export default AuthContext;
