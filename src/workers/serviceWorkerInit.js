const initializeWorkers = () => {
    window.addEventListener('load', () => {
        registerSW()
    })
}

const registerSW = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', {
            scope: '/'
        })
        .then(function (registration) {
            console.log('Registration successful, scope is:', registration.scope);
        })
        .catch(function (error) {
            console.log('Service worker registration failed, error:', error);
        })
    }
}

export { initializeWorkers }