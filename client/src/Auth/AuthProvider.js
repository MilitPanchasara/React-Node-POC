import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await axios.get('http://localhost:3333/verify', {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          setUser(response.data.tokendata);
        }
      } catch (error) {
        console.error('Not authenticated', error);
      }
    };
    checkAuth();
  }, []);

  const login = async (values) => {
    const response = await axios.post('http://localhost:3333/login', values, {
      withCredentials: true,
    });
    var userName = Cookies.get('userName');
    var userToken = Cookies.get('access_token');
    setUser({ username: userName,userToken:userToken});
  };

  const logout = async () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    window.location.assign("/");
  };

  const isAuthenticated = !!Cookies.get('access_token');

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);