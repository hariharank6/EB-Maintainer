self.addEventListener('activate', function (event) {
    console.log("worker activated");
});

var CACHE_NAME = 'static-cache';
var urlsToCache = ['/', 'index.html', '/bundle.js'];
self.addEventListener('install', function (event) {
    console.log("worker installed");
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(urlsToCache);
    }));
});

self.addEventListener('fetch', function (event) {
    if(urlsToCache.includes(event.request.url.substring("https://electricity-tracker-personal.web.app".length))) {
        event.respondWith(caches.match(event.request).then(function (response) {
            return response || fetchAndCache(event.request);
        }));
    }
});

function fetchAndCache(url) {
    return fetch(url).then(function (response) {
        // Check if we received a valid response
        if (!response.ok) {
            throw Error(response.statusText);
        }

        return caches.open(CACHE_NAME).then(function (cache) {
            cache.put(url, response.clone());
            return response;
        });
    }).catch(function (error) {
        return error
    });
}