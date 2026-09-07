const CACHE_VERSION = 'conanwiki-v1';
const APP_SHELL = ['/', '/offline', '/manifest.webmanifest'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_VERSION)
            .map(key => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isStaticAsset(url) {
  return (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/conanwiki/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.ttf') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.png')
  );
}

self.addEventListener('fetch', event => {
  const {request} = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first, fall back to cache, then the offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(
          async () =>
            (await caches.match(request)) ||
            (await caches.match('/offline')),
        ),
    );
    return;
  }

  // Static assets: cache-first, revalidate in the background.
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request).then(cached => {
        const network = fetch(request)
          .then(response => {
            const clone = response.clone();
            caches.open(CACHE_VERSION).then(cache => cache.put(request, clone));
            return response;
          })
          .catch(() => cached);
        return cached || network;
      }),
    );
  }
});
