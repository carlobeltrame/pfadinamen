const cacheName = 'pfadinamen';

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([
        './',
        './style.css',
        './termynal.css',
        './manifest.json',
        './spinner.svg',
        './github.png',
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, { ignoreSearch: true }))
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
