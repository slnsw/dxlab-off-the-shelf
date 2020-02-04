export const dedupeByField = (myArr = [], field) => {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[field]).indexOf(obj[field]) === pos;
  });
};
