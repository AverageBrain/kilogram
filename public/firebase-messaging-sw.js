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

function extractContent(s) {
    return s.replace(/<[^>]*>/g, '')
};

messaging.onBackgroundMessage((payload) => {
    console.log(
        '[firebase-messaging-sw.js] Received background message ',
    );
    console.log(payload)

    const data = payload['data']
    const jsonData = JSON.parse(data['data'])

    const chatName = () => {
        return jsonData['user']['name']
        return 'Новое уведомление'
    }

    if (data['type'] === 'newMessage') {
        const message = jsonData['message']['text'];

        self.registration.showNotification(chatName(), {
            body: extractContent(message),
            icon: '/logo512.png',
            actions: [{action: "open_url", title: "Read Now"}]
        });
    } else if (data['type'] === 'newReaction') {
        const message = 'Новая реакция'

        self.registration.showNotification(chatName(), {
            body: message,
            icon: '/logo512.png',
            actions: [{action: "open_url", title: "Read Now"}]
        });
    }
});
