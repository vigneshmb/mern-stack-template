import { useState, useEffect } from 'react';
import useBooleanToggle from './useBooleanToggle';

export default function useGeolocation(trackOptions = {}) {
  const [loading, toggleLoading] = useBooleanToggle(true);
  const [error, setError] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    const successCallback = (data) => {
      setError(null);
      setData(data.coords);
      toggleLoading.off();
    };
    const errorCallback = (e) => {
      setError(e.message);
      toggleLoading.off();
    };

    navigator.geolocation.getCurrentPosition(
      (e) => successCallback(e),
      errorCallback,
      trackOptions,
    );
  }, []);

  return { loading, error, data,};
}
