// Get content from the network.
self.addEventListener('fetch', event => {
    event.respondWith((async() => {
        try {
            return await fetch(event.request);
        } catch (e) {
            return new Response('You are offline :(', { status: 200 });
        }
    })());
});