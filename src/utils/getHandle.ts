import moment from "moment";

import { UserType } from "../types";
import { getCorrectMemberCase } from "./getCorrectCase";

export const getHandle = (options: {
  isGroup?: boolean;
  membersCount?: number;
  user: UserType;
}) => {
  const { isGroup, membersCount, user } = options;
  return isGroup
    ? `${membersCount} ${getCorrectMemberCase(membersCount)}`
    : user?.userStatus
      ? 'онлайн'
      : user?.lastSeen
        ? `был:a в сети ${moment(user.lastSeen).format('HH:MM DD.MM.YY')}`
        : 'был:a в сети недавно';
}