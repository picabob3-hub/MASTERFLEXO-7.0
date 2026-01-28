const CACHE_NAME = 'masterflexo-v1';
// Añadimos tu imagen a los archivos que se guardan en el celular
const assets = [
  './',
  './index.html',
  './manifest.json',
  './logotipo-aplicación.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
