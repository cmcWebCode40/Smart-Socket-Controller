import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {USER_SESSION, deleteFromAsyncStore, getFromAsyncStore} from '../utils';

type User = {
  email: string;
  lastName: string;
  firstName: string;
};

type TCreateContext = {
  user?: User;
  updateUser: (data: User) => void;
  clearUser: () => void;
  isAuthenticated: boolean;
  isLoadingSession: boolean;
};

export const AuthContext = createContext<TCreateContext>({
  clearUser: () => undefined,
  user: undefined,
  isAuthenticated: false,
  updateUser: () => undefined,
  isLoadingSession: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<undefined | User>(undefined);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const updateUser = useCallback((data: User) => {
    setUser(data);
    setIsAuthenticated(true);
  }, []);

  const clearUser = useCallback(async () => {
    setUser(undefined);
    await deleteFromAsyncStore(USER_SESSION);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const session = await getFromAsyncStore<User>(USER_SESSION);
        console.log('==================session==================');
        console.log(session);
        console.log('====================================');
        if (session) {
          setUser(session);
          setIsAuthenticated(true);
        }
      } catch {
        clearUser();
      } finally {
        setIsLoadingSession(false);
      }
    })();
  }, [clearUser]);

  const authContextValues = {
    user,
    updateUser,
    clearUser,
    isLoadingSession,
    isAuthenticated,
  };
  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
