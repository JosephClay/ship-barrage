import isFunction from './isFunction';

export default key => {
  return isFunction(key) ?
    (left, right) => {
      const lef = key(left);
      const rig = key(right);
      return lef > rig ? 1 : rig > lef ? -1 : 0;
    } :
    (left, right) => {
      const lef = left[key];
      const rig = right[key];
      return lef > rig ? 1 : rig > lef ? -1 : 0;
    };
};