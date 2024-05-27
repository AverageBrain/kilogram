// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyBDLLtIR9wlGEtLIJaOierO8oOEZWx4los",
    authDomain: "kilogram-cb7ad.firebaseapp.com",
    projectId: "kilogram-cb7ad",
    storageBucket: "kilogram-cb7ad.appspot.com",
    messagingSenderId: "195802844464",
    appId: "1:195802844464:web:7b0be694b182dad73bccf5",
    measurementId: "G-DDTD1G8KFL"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

self.addEventListener('push', ev => {
    const data = ev.data.json();
    console.log('Got push', data);
    self.registration.showNotification(data.title, {
        body: 'Hello, World!',
        icon: 'https://team1.ya-itmo.ru/logo192.png'
    });
});
