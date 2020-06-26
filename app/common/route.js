const { history, location } = global;

export default {
  clear() {
    history.replaceState({}, '', '/');
  },
  set(id) {
    history.replaceState({}, '', id);
  },
  reload() {
    location.reload();
  },
};