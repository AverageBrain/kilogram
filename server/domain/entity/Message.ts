import {BaseEntity} from "./BaseEntity";

export interface Message extends BaseEntity {
    chatId?: number
    userId?: number
    text?: string
}
