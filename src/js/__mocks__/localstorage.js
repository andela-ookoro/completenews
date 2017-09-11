const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    removeItem(key) {
      store[key] = {};
      return store;
    },
    setItem(key, value) {
      if (value == null) {
        store[key] = value;
      } else {
        store[key] = value.toString();
      }
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window.location, 'href', {
  writable: true,
  value: '/testRoute'
});
