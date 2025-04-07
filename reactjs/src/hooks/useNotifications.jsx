import { useEffect } from 'react';
import useBooleanToggle from './useBooleanToggle';

export default function useNotifications(){
  const [notifyPerm, setNotifyPerm] = useBooleanToggle(false);
  function requestPermission() {
    Notification.requestPermission().then((resp) =>
      resp==="granted" ? setNotifyPerm.on() : setNotifyPerm.off()
    );
  }

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      requestPermission();
    }
  }, []);
  return { requestPermission,notifyPerm };
};
