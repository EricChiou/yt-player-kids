const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/),
);


export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = './service-worker.js';
      navigator.serviceWorker.register(swUrl)
        .then(() => {
          if (isLocalhost) {
            console.log('register service worker successful');
          }
        }).catch((error) => {
          if (isLocalhost) {
            console.log('register service worker failed', error);
          }
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });

    navigator.serviceWorker.getRegistrations()
      .then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
  }
}
