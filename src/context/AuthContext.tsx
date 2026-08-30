import {createContext, useEffect, useState} from 'react';
import type {ReactNode} from 'react';
import {getMe} from '../services/api';
import type {User} from '../types/user';
import type {AuthContextType} from '../types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      const res = await getMe(token);
      if ('message' in res) {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        return;
      }
      setUser(res);
    };
    loadUser();
  }, [token]);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{token, user, setUser, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
