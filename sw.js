// Controle de Glicemia — service worker v5.1
// Estratégia: rede primeiro (pega a versão nova quando há internet), cache como reserva offline.
const CACHE="glicemia-pwa-v5-1";
const FILES=["./","./index.html","./manifest.json"];

self.addEventListener("install",event=>{
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES)));
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith("glicemia-pwa-")&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener("fetch",event=>{
  const req=event.request;
  if(req.method!=="GET")return;
  const url=new URL(req.url);
  const sameOrigin=url.origin===self.location.origin;
  event.respondWith(
    fetch(req).then(res=>{
      // guarda arquivos do app e a biblioteca de Excel (para importar/exportar offline depois do 1º uso)
      if(res.ok&&(sameOrigin||url.hostname==="cdn.jsdelivr.net")){
        const copy=res.clone();
        caches.open(CACHE).then(c=>c.put(req,copy));
      }
      return res;
    }).catch(()=>caches.match(req).then(c=>c||(req.mode==="navigate"?caches.match("./index.html"):undefined)))
  );
});
