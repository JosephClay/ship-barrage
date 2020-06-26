export default function Tutorial(store) {
  return {
    open() {
      store.set(true);
    },
    close() {
      store.set(false);
    },
  };
};