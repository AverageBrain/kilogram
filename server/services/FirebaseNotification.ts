import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';

const firebaseAdmin = initializeApp(
  {
    credential: cert('./server/services/firebase_serviceAccountKey.json'),
  },
  'kilogram',
);

export class PushNotificationService {
  send = (userToken: string, type: string, uuid: string, data: any): void => {
    const payload = {
      data: { type, data: JSON.stringify(data), eventId: uuid },
      token: userToken,
      webpush: {
        fcmOptions: {
          link: 'https://team1.ya-itmo.ru/',
        },
      },
    };
    getMessaging(firebaseAdmin)
      .send(payload)
      .then((response) => {
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.warn('Error sending message:', error);
      });
  };
}

export default PushNotificationService;
