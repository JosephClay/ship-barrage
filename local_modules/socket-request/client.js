const TIMEOUT = 90000;

export default socket => {
  return (method, data) => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let timeout;

      const onDisconnect = () => {
        clearTimeout(timeout);
        reject(new Error('disconnect'));
      };

      socket.emit('request', { method, data }, ({ result, error }) => {
        clearTimeout(timeout);
        socket.removeListener('disconnect', onDisconnect);
        if (error) return reject(new Error(`socket-request: ${error.message || 'error'}`));
        resolve(result);
      });     

      timeout = setTimeout(() => {
        socket.removeListener('disconnect', onDisconnect);
        reject(new Error(`exceeded ${TIMEOUT}ms`));
      }, TIMEOUT);

      socket.once('disconnect', onDisconnect);
    });
  };
};