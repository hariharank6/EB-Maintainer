self.addEventListener('activate', function (event) {
    // Perform some task
    console.log("worker activated");
});
var CACHE_NAME = 'static-cache';
var urlsToCache = ['.', 'index.html', '/bundle.js'];
self.addEventListener('install', function (event) {
    console.log("worker installed");
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(urlsToCache);
    }));
});
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetchAndCache(event.request);
    }));
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
        console.log('Request failed:', error); // You could return a custom offline 404 page here
    });
}

var deferredPrompt;
self.addEventListener('beforeinstallprompt', function (e) {
    // Stash the event so it can be triggered later.
    deferredPrompt = e; // Update UI notify the user they can add to home screen

    showInstallPromotion();
});

self.addEventListener('beforeinstallprompt', function (e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault(); // Stash the event so it can be triggered later.

    deferredPrompt = e; // Update UI to notify the user they can add to home screen

    addBtn.style.display = 'block';
    addBtn.addEventListener('click', function (e) {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none'; // Show the prompt

        deferredPrompt.prompt(); // Wait for the user to respond to the prompt

        deferredPrompt.userChoice.then(function (choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }

            deferredPrompt = null;
        });
    });
});