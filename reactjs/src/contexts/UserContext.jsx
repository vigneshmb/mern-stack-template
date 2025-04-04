import { getUser } from '#Api/usersApi.js';
import { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({
  isAuthenticated: false,
  userData: {},
  updateUserData:()=>{}
});

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem('authJWT');
      if (!(token || token == '')) {
        return null;
      }

      const apiData = await getUser();
      if (!userData) {
        setIsAuthenticated(false);
        return null;
      }
      setIsAuthenticated(true);
      setUserData(apiData?.data?.[0]);
    }
    fetchUserDetails();
  }, []);

  const updateUserData=(isLoggedin,loginApiData)=>{
    setIsAuthenticated(isLoggedin)
    setUserData(loginApiData)
  }

  const value = {
    isAuthenticated,
    userData,
    updateUserData
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
