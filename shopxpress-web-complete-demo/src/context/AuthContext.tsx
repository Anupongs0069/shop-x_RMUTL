// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useRef, useMemo } from 'react';
import authHelper from '../helpers/authHelper';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import UserProfileContract from '../contracts/UserProfileContract';
import { Spinner } from 'react-bootstrap';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  currentUser?: UserProfileContract
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [currentUser, setCurrentUser] = useState<UserProfileContract>();
  const [loading, setLoading] = useState<boolean>(true);
  const didRequest = useRef(false);
  const isAuthenticated = useMemo(() => {
    return currentUser !== undefined;
  }, [currentUser])

  const login = async (email: string, password: string) => {
    console.log('Login is called');

    try {
      const authContract = await authService.login(email, password);
      authHelper.setAuth(authContract.data);
      console.log('Token', authHelper.token)
      const userProfile = await userService.getProfile();
      setCurrentUser(userProfile.data)
      return true;
    } catch (error) {
      console.log(error)
    }
    return false;

  };
  const logout = () => {
    console.log('Logout is called');
    authHelper.removeAuth();
    setCurrentUser(undefined);
  };

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    console.log('Init Auth Context.')
    const validateUser = async () => {
      try {
        if (!didRequest.current) {
          if (authHelper.token) {
            console.log('Will get and retrieve user data.');
            const userProfile = await userService.getProfile();
            setCurrentUser(userProfile.data)
          }
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          logout();
        }
        console.log('Display error page', didRequest.current);
      }

    };

    validateUser();
    return () => {
      didRequest.current = true;
      console.log('destroy didRequest')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentUser]);



  if (loading) {
    return <> <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner></>
  }
  else {
    return <AuthContext.Provider value={{ isAuthenticated, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
