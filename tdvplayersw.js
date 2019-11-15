self.addEventListener('install', function(event)
{
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', function(event)
{
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event)
{
    var request = event.request;
    if ((request.cache === 'only-if-cached') && (request.mode !== 'same-origin'))
        return;
    event.respondWith(fetch(request).then(function(response)
    {
        return response;
    }, 
    function(error)
    {
        return caches.match(request, {ignoreSearch: true, ignoreMethod: true}).then(function(response)
        {
            return response || error;
        });
    }));
});