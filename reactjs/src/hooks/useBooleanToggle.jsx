import { useState, useRef } from 'react';

export default function useBooleanToggle(initValue) {
  const [flag, setFlag] = useState(initValue);

  const boolToggleVal = useRef({
    toggle: () => setFlag((lastValue) => !lastValue),
    on: () => setFlag(true),
    off: () => setFlag(false),
  });

  return [flag, boolToggleVal.current];
}
