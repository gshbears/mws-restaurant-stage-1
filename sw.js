let staticCacheName = 'restaurants-v5';

self.addEventListener('install', function(event) {
 //  console.log('Install cache');
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/css/styles.css',
        '/css/restaurant_styles.css',
        '/data/restaurants.json',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/sw_reg.js',
        '/sw.js'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  //  console.log('activate cache');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
        //  console.log(cacheName);
          return cacheName.startsWith('restaurants-v') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
        //  console.log("deleted cache");
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
 var requestUrl = new URL(event.request.url);
 if(requestUrl.origin === location.origin){
  // console.log(requestUrl.origin);
   if(requestUrl.pathname === '/'){
  //   console.log(requestUrl.pathname);
     event.respondWith(caches.match('/'));
     return;
   }
 }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // console.log(event.request);
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
