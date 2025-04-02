import { useEffect, useReducer } from 'react';

const networkStatus = {
  'slow-2g': 'low',
  '2g': 'low',
  '3g': 'low',
  '4g': 'high',
};

const networkDefault = {
  online: false,
  downSpeed: 0,
  relativeSpeed: networkStatus['2g'],
  error: '',
  maxDownSpeed: 0,
  connType: '',
};

function networkReducer(state, action) {
  const { type, payload } = action;

  if (type === 'change_online') {
    return {
      ...state,
      online: payload?.online || false,
    };
  } else if (type === 'read_error') {
    return {
      ...state,
      error: "Network details couldn't be retrieved",
    };
  } else if (type === 'downSpeed') {
    return {
      ...state,
      downSpeed: payload?.downlink || 0,
    };
  } else if (type === 'relativeSpeed') {
    const connStr = payload?.effectiveType || '2g';
    const relativeSpeed = networkStatus[connStr] || 'low';
    return {
      ...state,
      relativeSpeed,
    };
  } else if (type === 'maxDownSpeed') {
    return {
      ...state,
      maxDownSpeed: payload?.downlinkMax || 0,
    };
  } else if (type === 'connType') {
    return {
      ...state,
      connType: payload?.connType || 'unknown',
    };
  }
}

export default function useNetworkStatus() {
  const [network, updateNetwork] = useReducer(networkReducer, networkDefault);

  useEffect(() => {
    let networkObj=null;
    const updateNetworkValues = () => {
      const online = navigator.onLine;
      const { downlink, effectiveType, downlinkMax, type } = networkObj;

      updateNetwork({ type: 'change_online', payload: { online } });
      updateNetwork({ type: 'downSpeed', payload: { downlink } });
      updateNetwork({ type: 'relativeSpeed', payload: { effectiveType } });
      updateNetwork({ type: 'maxDownSpeed', payload: { downlinkMax } });
      updateNetwork({ type: 'connType', payload: { type } });
    };

    networkObj = navigator.connection;
    // !connectionObj ? updateNetwork('read_error') :updateNetworkValues(connectionObj);
    updateNetworkValues();
    networkObj.addEventListener('change', updateNetworkValues);
    
    return () => {
        networkObj.removeEventListener('change', updateNetworkValues);
    };
  }, []);

  return network;
}
