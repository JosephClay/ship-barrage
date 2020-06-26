import isString from 'utils/isString';
import { R_IS_NAME, R_IS_ID } from 'settings';

export const isName = function(value) {
  if (!isString(value)) return false;
  const name = value.trim();
  if (!name.length) return false;
  if (name.length > 20) return false;
  return R_IS_NAME().test(name);
};

export const isId = function(value) {
  if (!isString(value)) return false;
  const id = value.trim();
  if (value !== id) return false;
  if (id.length !== 5) return false;
  return R_IS_ID().test(id);
};