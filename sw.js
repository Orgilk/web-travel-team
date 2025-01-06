const myCache = 'WEB_APP_CACHE_NAME';

self.addEventListener('install', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        await cache.addAll([
            '/'
        ]);
    }());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(async function() {
        const cache = await caches.open(myCache);
        const cacheNames = await cache.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
    }());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    } else {
        event.respondWith(fetch(event.request));
    }
});