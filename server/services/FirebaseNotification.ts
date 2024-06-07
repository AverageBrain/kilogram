import { cert, initializeApp } from 'firebase-admin/app';
import { getMessaging } from 'firebase-admin/messaging';
import {Logger} from "./Logger";

const firebaseAdmin = initializeApp(
  {
    credential: cert('./server/services/firebase_serviceAccountKey.json'),
  },
  'kilogram',
);

export class PushNotificationService {
    options = {
        priority: 'high',
        timeToLive: 60 * 60 * 24,
    };

    send = (userToken: string, message: string): void => {
        const payload = {
            data: {
                title: 'Notification',
                data: message,
            },
            notification: {
                title: 'Notification',
                body: message
            },
            token: userToken,
            webpush: {
                fcmOptions: {
                    link: "https://team1.ya-itmo.ru/"
                }
            }
        };
        getMessaging(firebaseAdmin)
            .send(payload)
            .then(response => {
                Logger.info('Successfully sent message:', {response: response});
            })
            .catch(error => {
                Logger.error('Error sending message:', {error: error});
            });
    };
}

export default PushNotificationService;
