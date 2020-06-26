// https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API

const { document } = global;

const [key, visibilityChange] = (function() {
  if (document.hidden !== undefined) {
    return ['hidden', 'visibilitychange'];
  }

  if (document.msHidden !== undefined) {
    return ['msHidden', 'msvisibilitychange'];
  }

  if (document.webkitHidden !== undefined) {
    return ['webkitHidden', 'webkitvisibilitychange'];
  }

  return [];
}());

export default function Visibility() {
  let hidden;

  const handleVisibilityChange = function() {
    if (document[key]) return (hidden = true);
    hidden = false;
  };

  handleVisibilityChange();
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  return {
    isHidden: () => hidden,
    isVisible: () => !hidden,
  };
};