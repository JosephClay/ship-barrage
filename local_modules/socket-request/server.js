export default socket => {
  const map = new Map();

  socket.on('request', async function({ method, data }, res) {
    const fn = map.get(method);
    if (!fn) new Error(`endpoint not found: ${method}`);

    try {
      const result = await fn(data, socket);
      res({ result });
    } catch (error) {
      res({ error });
    }
  });

  return (event, fn) => {
    map.set(event, fn);
  };
};