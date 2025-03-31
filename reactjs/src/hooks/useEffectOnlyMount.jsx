import { useEffect, useRef } from 'react';

const useEffectOnlyMount = (callback, dependencies) => {
  const mountedRef = useRef(true);
  useEffect(() => {
    if (mountedRef.current) {
      mountedRef.current = false;
      return;
    }
    return callback();
  }, dependencies);
};
export default useEffectOnlyMount;
