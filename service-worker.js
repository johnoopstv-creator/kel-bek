const CACHE_NAME = "kel-bek-last10-named-only-network-first-v1";
const ASSETS = ["./manifest.json","./icon-192.png","./icon-512.png"];
self.addEventListener("install", event => {event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));self.skipWaiting();});
self.addEventListener("activate", event => {event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => {if (k.startsWith("kel-bek") && k !== CACHE_NAME) return caches.delete(k);} ))));self.clients.claim();});
self.addEventListener("fetch", event => {
 const req=event.request;
 if(req.mode==="navigate" || req.url.includes("index.html")){event.respondWith(fetch(req).catch(()=>caches.match("./index.html")));return;}
 event.respondWith(fetch(req).catch(()=>caches.match(req)));
});
