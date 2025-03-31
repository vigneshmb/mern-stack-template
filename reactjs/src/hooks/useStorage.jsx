export default function useStorage() {
  const getLocal = (key) => {
    const value = localStorage.getItem(key) || null;
    if (!value) {
      localStorage.removeItem(key);
      return null;
    } else {
      return JSON.parse(value);
    }
  };
  const setLocal = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getSession = (key) => {
    const value = sessionStorage.getItem(key) || null;
    if (!value) {
      sessionStorage.removeItem(key);
      return null;
    } else {
      return JSON.parse(value);
    }
  };
  const setSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return {
    getLocal,
    setLocal,
    getSession,
    setSession,
  };
}
