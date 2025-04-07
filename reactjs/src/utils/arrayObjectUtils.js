export const checkArrayLength = (value) => {
  return value && value?.length;
};

export const checkObjectLength = (value) => {
  return value && Object.keys(value)?.length;
};

export const getObjEmptyValues = (obj, emptyFlag = null) => {
  let newObj = {};
  Object.keys(obj).map((key) => {
    const value = obj[key];
    if (emptyFlag) {
      if (value && value !== '') {
        newObj[key] = value;
      }
    } else {
      if (value && value === '') {
        newObj[key] = value;
      }
    }
  });
  return newObj;
};

export const updateArrOfObjByKey = (arrObj, key, newData) => {
  let newArrObj = [];
  arrObj.forEach((ele) => {
    newArrObj.push(newData[key] !== ele[key] ? ele : newData);
  });
  return newArrObj;
};
