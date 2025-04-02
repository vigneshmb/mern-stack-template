import { useEffect, useReducer } from 'react';
import { numToHourMins } from '#Utils/appConstants.js';

const batteryDefault = {
  level: 0,
  error: '',
  charging: false,
  discharTime: 0,
  charTime: 0,
};

function batteryReducer(state, action) {
  console.log(action);

  const { type, payload } = action;

  if (type === 'change_level') {
    return {
      ...state,
      level: (payload?.level || 0) * 100,
    };
  } else if (type === 'read_error') {
    return {
      ...state,
      error: "Battery details couldn't be retrieved",
    };
  } else if (type === 'charging_status') {
    return {
      ...state,
      charging: payload?.charging || false,
    };
  } else if (type === 'update_discharTime') {
    const disTime = numToHourMins((payload?.dischargingTime || 0) / 60);
    return {
      ...state,
      discharTime: disTime,
    };
  } else if (type === 'update_charTime') {
    const { charging } = state;
    const chTime = numToHourMins(
      (charging ? payload?.chargingTime || 0 : 0) / 60,
    );

    return {
      ...state,
      charTime: chTime,
    };
  }
}

export default function useBatteryStatus() {
  const [battery, updateBattery] = useReducer(batteryReducer, batteryDefault);

  useEffect(() => {
    const updateBatteryValues = (batteryObj) => {
      const { level, charging, dischargingTime, chargingTime } = batteryObj;
      updateBattery({ type: 'change_level', payload: { level } });
      updateBattery({ type: 'charging_status', payload: { charging } });
      updateBattery({
        type: 'update_discharTime',
        payload: { dischargingTime },
      });
      updateBattery({ type: 'update_charTime', payload: { chargingTime } });
    };

    const batteryStatus = navigator.getBattery().then((batteryObj) => {
      if (!batteryObj) {
        updateBattery('read_error');
        return null;
      }
      updateBatteryValues(batteryObj);
      return batteryObj;
    });

    batteryStatus.addEventListener('levelChange', () => {
      updateBatteryValues(batteryStatus);
    });
    return () => {
      batteryStatus.removeEventListener('levelChange', () => {
        updateBatteryValues(batteryStatus);
      });
    };
  }, []);

  return battery;
}
