import React, { createContext, ReactNode, useContext } from 'react';
import AuthContextType from '../types/AuthContextType';
const AuthContext = createContext({} as AuthContextType);
export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{} as AuthContextType}>
      {}
    </AuthContext.Provider>
  );
}
