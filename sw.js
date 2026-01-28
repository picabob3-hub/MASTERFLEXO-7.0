const CACHE_NAME = 'masterflexo-v7';
const assets = [
  './',
  'index.html',
  'manifest.json',
  'logotipo-aplicación.png' // Verifica que este archivo exista con este nombre exacto
];

// Instalación y almacenamiento en caché
self.addEventListener('install', e => {
  self.skipWaiting(); // Obliga al SW nuevo a tomar el control
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cache abierto');
      return cache.addAll(assets);
    })
  );
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Estrategia de respuesta
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
