import { getUser } from '#Api/usersApi.js';
import useBooleanToggle from '#Hooks/useBooleanToggle.jsx';
import useEffectOnlyMount from '#Hooks/useEffectOnlyMount.jsx';
import { createContext, useState } from 'react';

export const UserContext = createContext({
  isAuthenticated: false,
  userData: {},
  updateUserData: () => {},
  isUserLoading: false,
  setIsUserLoading: () => {},
});

export const UserProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useBooleanToggle(false);
  const [isUserLoading, setIsUserLoading] = useBooleanToggle(false);
  const [userData, setUserData] = useState({});

  useEffectOnlyMount(() => {
    async function fetchUserDetails() {
      setIsUserLoading.on();
      const token = localStorage.getItem('authJWT');
      if (!(token || token == '')) {
        setIsUserLoading.off();
        return null;
      }

      const apiData = await getUser();
      if (!userData) {
        setIsAuthenticated.off();
        setIsUserLoading.off();
        return null;
      }
      setIsAuthenticated.on();
      setUserData(apiData?.data?.[0]);
      setIsUserLoading.off();
    }
    fetchUserDetails();
  }, []);

  const updateUserData = (isLoggedin, loginApiData) => {
    setIsUserLoading.on();
    isLoggedin ? setIsAuthenticated.on() : setIsAuthenticated.off();
    setUserData(loginApiData);
    setIsUserLoading.off();
  };

  const value = {
    isAuthenticated,
    userData,
    updateUserData,
    isUserLoading,
    setIsUserLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
