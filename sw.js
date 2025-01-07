// const myCache = 'WEB_APP_CACHE_NAME';

// self.addEventListener('install', (event) => {
//     event.waitUntil(async function() {
//         const cache = await caches.open(myCache);
//         await cache.addAll([
//             '/'
//         ]);
//     }());
// });

// self.addEventListener('activate', (event) => {
//     event.waitUntil(async function() {
//         const cache = await caches.open(myCache);
//         const cacheNames = await cache.keys();
//         await Promise.all(
//             cacheNames.map(cacheName => caches.delete(cacheName))
//         );
//     }());
// });

// self.addEventListener('fetch', (event) => {
//     event.respondWith(async function() {
//         const networkPromise = fetch(event.request);
//         const cachePromise = caches.open(myCache);
//         try {
//             const networkResponse = await networkPromise;
//             cachePromise
//                 .then(cache => {
//                     cache.put(event.request, networkResponse);
//                 });
//             return networkResponse.clone();
//         } catch (error) {
//             const cache = await cachePromise;
//             const cacheResponse = await cache.match(event.request);
//             return cacheResponse;
//         }
//     }());
//     if (event.request.method === 'GET') {
//         event.respondWith(
//             caches.match(event.request).then((cachedResponse) => {
//                 return cachedResponse || fetch(event.request);
//             })
//         );
//     } else {
//         event.respondWith(fetch(event.request));
//     }
// });
const myCache = 'WEB_APP_CACHE_NAME';

self.addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await caches.open(myCache);
            await cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
            ]);
        })()
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== myCache) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })()
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            if (event.request.method === 'GET') {
                const cache = await caches.open(myCache);
                const cachedResponse = await cache.match(event.request);

                if (cachedResponse) {
                    return cachedResponse;
                }

                try {
                    const networkResponse = await fetch(event.request);
                    if (networkResponse && networkResponse.status === 200) {
                        cache.put(event.request, networkResponse.clone());
                    }
                    return networkResponse;
                } catch (error) {
                    console.error('Fetch failed, returning cache if available:', error);
                    const fallbackResponse = await cache.match('/');
                    return fallbackResponse || new Response('Offline', { status: 503 });
                }
            } else {
                return fetch(event.request);
            }
        })()
    );
});
