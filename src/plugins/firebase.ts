// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBDLLtIR9wlGEtLIJaOierO8oOEZWx4los',
  authDomain: 'kilogram-cb7ad.firebaseapp.com',
  projectId: 'kilogram-cb7ad',
  storageBucket: 'kilogram-cb7ad.appspot.com',
  messagingSenderId: '195802844464',
  appId: '1:195802844464:web:7b0be694b182dad73bccf5',
  measurementId: 'G-DDTD1G8KFL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

function sendToServer() {
  getToken(messaging, { vapidKey: 'BM7MuTmir8V3Vn3sFJOtBxnUncbLV2JTFwm6yg2F8w4zZ3YEPuawV8trJHTeFIrS-g1gf_Gu0vX63S0LdI_MzyU' }).then((currentToken) => {
    if (currentToken) {
      console.log(currentToken);
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });
}

export function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      sendToServer();
    }
  },
  );
}

onMessage(messaging, (payload) => {
  const notification = new Notification(payload.notification?.title ? payload.notification?.title : 'Title', payload.notification);
  new ServiceWorkerRegistration().showNotification(payload.notification?.title ? payload.notification?.title : 'Title', payload.notification);
  console.log('Message received. ', payload);
});

navigator.serviceWorker.register('firebase-messaging-sw.js');
