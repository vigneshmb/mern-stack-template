export const getRequiredFields = (array, fieldMap) => {
  let fieldFilter = {};
  array.forEach((id) => {
    let fieldName = fieldMap?.[id - 1] || '';
    if (fieldName && fieldName !== '') {
      fieldFilter[fieldName] = 1;
    }
  });
  return fieldFilter;
};

export const checkArrayLength = (value) => {
  return value && value?.length;
};

export const checkObjectLength = (value) => {
  return value && Object.keys(value)?.length;
};

export const deleteUnwantedKeys = (objectVal, neededKeysArr) => {
  for (let key in objectVal) if (!neededKeysArr.includes(key)) delete objectVal[key];
  return objectVal;
};
