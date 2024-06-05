import { Message } from '@prisma/client';

export interface MessageWithFileUrls {
  message: Message;
  fileUrls: string[];
}
