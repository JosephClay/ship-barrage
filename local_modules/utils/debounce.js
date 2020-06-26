export default function debounce(fn, wait = 16) {
  let timeout;
  return function(arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = undefined;
      fn(arg);
    }, wait);
  };
}
