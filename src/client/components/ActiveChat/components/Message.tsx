import { FC } from 'react';
import { UserType, MessageType } from '../../../../types'
import clsx from 'clsx';

interface Props {
  message: MessageType;
  activeUser: UserType;
}

export const Message: FC<Props> = ({ message, activeUser }) => {
  const isActivePerson = activeUser === message.user;

  return (
    <div className={clsx('message', isActivePerson ? 'active-person-message' : 'partner-message')}>
      {message.text}
    </div>
  );
};
