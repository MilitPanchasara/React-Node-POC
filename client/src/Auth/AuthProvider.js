import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import axiosInstance from './AxiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: !!Cookies.get('access_token'),
    userName: Cookies.get('userName'),
    role:Cookies.get('userRole'),
    authToken:Cookies.get('access_token')
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await axiosInstance.get('/verify', {
            withCredentials: true,
          });
          var userName = Cookies.get('userName');
          var userToken = Cookies.get('access_token');
          var userRole = Cookies.get('userRole');
          setAuthState({
            isAuthenticated:true,
            userName:userName,
            role:userRole,
            authToken:userToken
          })
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
    const verifyToken = await axiosInstance.get('/verify', {
      withCredentials: true,
    });
    var userName = Cookies.get('userName');
    var userToken = Cookies.get('access_token');
    var userRole = Cookies.get('userRole');
    setAuthState({
      isAuthenticated:true,
      userName:userName,
      role:userRole,
      authToken:userToken
    })
  };

  const logout = async () => {
    const allCookies = Cookies.get();
    Object.keys(allCookies).forEach((cookieName) => {
      Cookies.remove(cookieName);
    });
    setAuthState({
      isAuthenticated: false,
      userName: null,
      role: 'guest',
      authToken:'',
    });
    window.location.assign("/");
  };

  const isAuthenticated = !!Cookies.get('access_token');

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated,authState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);