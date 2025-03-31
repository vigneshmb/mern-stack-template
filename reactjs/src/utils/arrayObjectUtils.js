export const checkArrayLength = (value) => {
  return value && value?.length;
};

export const checkObjectLength = (value) => {
  return value && Object.keys(value)?.length;
};
