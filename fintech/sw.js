self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('vyoma-debt-crusher-v1').then(cache => cache.addAll([
      '/', '/debt.html', '/manifest.json'
    ]))
  );
});
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(r=>{ return caches.open('vyoma-debt-crusher-v1').then(cache=>{ cache.put(event.request, r.clone()); return r; }); }))
  );
});
