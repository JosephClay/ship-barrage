self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('v2').then(cache => {
      return cache.addAll([
        '/assets/audio/',
        '/assets/audio/background.mp3',
        '/assets/audio/soundeffects.mp3',
        '/assets/favicons/',
        '/assets/favicons/114.png',
        '/assets/favicons/favicon.ico',
        '/public/app.js',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  // only for GETs
  if (event.request.method !== 'GET') return;
  // only for workers
  if (!event.request.url.includes(`.worker.js`)) return;

  event.respondWith(
    caches
      .match(event.request)
      .then(function(cached) {
        const fetchedFromNetwork = response => {
          const cacheCopy = response.clone();

          console.log('WORKER: fetch response from network.', event.request.url);

          caches
            .open(`v2fetch`)
            .then(cache => cache.put(event.request, cacheCopy));

          return response;
        };

        const unableToResolve = () => {
          return new Response(`console.log('Service Unavailable');`, {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'application/javascript'
            }),
          });
        };

        const networked = fetch(event.request)
          // We handle the network request with success and failure scenarios.
          .then(fetchedFromNetwork, unableToResolve)
          // We should catch errors on the fetchedFromNetwork handler as well.
          .catch(unableToResolve);

        return cached || networked;
      })
  );
});