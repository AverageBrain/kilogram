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
    send = (userToken: string, type: string, uuid: string, data: any): void => {
        const payload = {
            data: {type: type, data: JSON.stringify(data), eventId: uuid},
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
