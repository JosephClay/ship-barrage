export default (arr, key) => arr.reduce((memo, obj) => {
  memo[obj[key]] = obj;
  return memo;
}, Object.create(null));