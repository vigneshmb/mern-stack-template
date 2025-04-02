export default function useVibration() {
  const vibrateDevice = (seq) => {
    navigator.vibrate(seq);
  };

  const stopVibrate = () => {
    navigator.vibrate();
  };
  return { vibrateDevice, stopVibrate };
}
