
  const preload = function(url, callback) {
    const img = new Image();
    img.src = url;
    img.onload = callback;
    return img;
  };