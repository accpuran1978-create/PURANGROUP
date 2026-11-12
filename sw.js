// Puran Staff: app shell cache + phone notifications (Firebase Cloud Messaging)
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js','https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');
firebase.initializeApp({"apiKey": "AIzaSyC8UfaibtVqGl2nXNkupUJnJiMWHwsTQog", "authDomain": "puran-staff-aad17.firebaseapp.com", "projectId": "puran-staff-aad17", "storageBucket": "puran-staff-aad17.firebasestorage.app", "messagingSenderId": "282043011033", "appId": "1:282043011033:web:e2cd47d9a93705a131d3c8"});
var messaging=firebase.messaging();
messaging.onBackgroundMessage(function(p){});   // notification part is shown automatically
self.addEventListener('notificationclick',function(e){e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(function(cs){for(var i=0;i<cs.length;i++){if('focus' in cs[i])return cs[i].focus()}return clients.openWindow('./')}))});
var C='puran-staff-v4',FILES=['./','./index.html','./manifest.json','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(C).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(x){return x!==C}).map(function(x){return caches.delete(x)}))}));self.clients.claim()});
self.addEventListener('fetch',function(e){var u=new URL(e.request.url);if(u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)});return r}).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match('./index.html')})}))});
