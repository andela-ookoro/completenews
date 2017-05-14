Object.defineProperty(document, 'currentScript', {
  value: document.createElement('script'),
});
Object.defineProperty(window, 'localStorage', { value: localStorageMock });
