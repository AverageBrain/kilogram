import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CalendarOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { chatsStore, messagesStore, userStore } from '../../../../stores';
import { chatApiClient } from '../../../../hands';
import SendButton from '../SendButton';
import { getHTMLMetadata } from './getHTMLMetadata';
import styles from './SendForm.module.scss';
import buttonsStyles from '../../../../styles/buttons.module.scss';

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
  setShouldLoadDelayed: (value: boolean) => void;
};

const SendMessage: React.FC<Props> = ({ scrollRef, setShouldLoadDelayed }) => {
  const { sendMessage, sendDelayMessage, clearMessages } = messagesStore;
  const { selectedItem: chat, setSelectedChat, getMetadata } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  const handleSubmit = async (inTime?: Date) => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));

    const safeHtml = DOMPurify.sanitize(htmlContent + await getHTMLMetadata(htmlContent, getMetadata));
    
    if (editorState.getCurrentContent().hasText()) {
      setEditorState(EditorState.createEmpty());
      if (chat) {
        inTime ? await sendDelayMessage(chat.id, safeHtml, inTime) : await sendMessage(chat.id, safeHtml);      
      } else if (user) {
        const curChat = await chatApiClient.createChat(user.id);
        inTime ? await sendDelayMessage(curChat.id, safeHtml, inTime) : await sendMessage(curChat.id, safeHtml);      
        setSelectedChat(chat);
        setSelectedUser(undefined);
      }
    }
  
    scrollRef?.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }

  const handleReturn = (event: SyntheticKeyboardEvent, editorState: EditorState): boolean => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      handleSubmit();
      return true;
    }
    return false;
  }

  const handleClickDelay = () => {
    clearMessages();
    setShouldLoadDelayed(true);
  };

  return (
    <div className={styles["send-message"]}>
      <Editor
        stripPastedStyles
        wrapperClassName={styles["wrapper-class"]}
        toolbarClassName={styles["toolbar-class"]}
        editorClassName={styles["editor-class"]}
        placeholder="Введите сообщение..."
        editorState={editorState}
        onEditorStateChange={setEditorState}
        handleReturn={handleReturn}
        toolbar={{
          options: ['inline', 'link', 'emoji', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          emoji: {
            popupClassName: styles['popover-class'],
          },
          link: {
            popupClassName: styles['popover-class'],
          }
        }}
        localization={{
          locale: 'ru',
        }}
      />
      <button className={buttonsStyles['icon-svg-button']} onClick={handleClickDelay}>
        <CalendarOutlined />
      </button>
      <SendButton
        disabledDelay={!editorState.getCurrentContent().hasText()}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default observer(SendMessage);
