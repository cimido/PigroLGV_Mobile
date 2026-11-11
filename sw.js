// Lazy LGV Campo — guarda o app no aparelho para funcionar sem internet.
// Ao publicar uma versão nova do index.html, aumente o número abaixo.
const VERSAO = "lazylgv-campo-v1";
const ARQUIVOS = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", evento => {
  evento.waitUntil(caches.open(VERSAO).then(cache => cache.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", evento => {
  evento.waitUntil(caches.keys()
    .then(nomes => Promise.all(nomes.filter(n => n !== VERSAO).map(n => caches.delete(n))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", evento => {
  if (evento.request.method !== "GET") return;
  evento.respondWith(caches.match(evento.request, {ignoreSearch: true}).then(resposta => resposta || fetch(evento.request)));
});
