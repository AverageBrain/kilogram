import {BaseEntity} from "./BaseEntity";

export interface UserChat extends BaseEntity  {
    userId?: number
    chatId?: number
}