const cacheName = 'Temporas';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // Our application only has two files here index.html and manifest.json
      // but you can add more such as style.css as your app grows
      return cache.addAll([
        './',
        './termynal.css',
        './manifest.json',
        './index.js',
        './tf.min.js',
        './model/1/char_to_idx.json',
        './model/1/SavedModel-50-tfjs/model.json',
        './model/1/SavedModel-50-tfjs/group1-shard1of2.bin',
        './model/1/SavedModel-50-tfjs/group1-shard2of2.bin',
      ]);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
