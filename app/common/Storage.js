const { localStorage } = global;

export default function Storage(key) {
  return {
    get() {
      const value = localStorage.getItem(key);
      if (value === null || value === undefined) return;
      return JSON.parse(value).value;
    },
    set(value) {
      if (value === null || value === undefined) return localStorage.removeItem(key);
      
      localStorage.setItem(key, JSON.stringify({ value }));
      return value;
    },
    clear() {
      localStorage.removeItem(key);
    },
  };
};