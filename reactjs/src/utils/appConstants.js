let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let passwordRegex =
  /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$/;

export const checkEmail = (value) => emailRegex.test(value);
export const checkPassword = (value) => passwordRegex.test(value);

export const numToHourMins = (mins) => {
  const computedMins = mins > 0 && mins !== Infinity ? mins : 0;
  return `${Math.floor(computedMins / 60)} hours ${Math.floor(computedMins % 60)} minutes`;
};
