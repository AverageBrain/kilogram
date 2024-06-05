/* eslint-disable import/no-cycle */
import { User } from '@prisma/client';
import { PushNotificationService } from './FirebaseNotification';
import { prisma } from '../domain/PrismaClient';
import { makeRandomString } from '../utils/makeid';
import { SSEService } from './SSEService';

class MainNotificationService {
  /**
     * Главный класс для уведомлений. Дублирует отправку в SSE и Firebase FCM
     */
  sseService = new SSEService();

  pushNotificationService = new PushNotificationService();

  async publishMessagesWithUsers(users: User[], type: string, data: any) {
    const uuid = makeRandomString(16);

    const sseEvents = users.map((user) => this.sseService.publishMessage(user.id, type, uuid, data));
    const tokens = users.map((u) => u.firebaseNotificationToken);
    const firebaseEvents = tokens.map((t) => {
      if (t != null) {
        return this.pushNotificationService.send(t, type, uuid, data);
      }

      return undefined;
    });

    await Promise.all([...firebaseEvents, ...sseEvents]);
  }

  async publishMessages(toUserIds: number[], type: string, data: any) {
    const users = await prisma.user.findMany({ where: { id: { in: toUserIds } } });
    await this.publishMessagesWithUsers(users, type, data);
  }
}

export default MainNotificationService;
