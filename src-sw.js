importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.0.0/workbox-sw.js');

console.log('this is my custom service worker');

workbox.routing.registerRoute(
    new RegExp('http://starlord.hackerearth.com/beercraft'),
    workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  );

workbox.precaching.precacheAndRoute([]);