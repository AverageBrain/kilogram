/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CalendarOutlined, CloseCircleOutlined, FileAddOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { chatsStore, messagesStore, userStore } from '../../../../stores';
import SendButton from '../SendButton';
import { getHTMLMetadata } from './getHTMLMetadata';
import styles from './SendForm.module.scss';
import buttonsStyles from '../../../../styles/buttons.module.scss';

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
  setShouldLoadDelayed: (value: boolean) => void;
  isToolbarHidden: boolean;
};

const SendMessage: React.FC<Props> = ({ scrollRef, setShouldLoadDelayed, isToolbarHidden }) => {
  const { loading, sendMessage, sendDelayMessage, resetItems } = messagesStore;
  const { selectedItem: chat, setSelectedChat, getMetadata } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [fileList, setFileList] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const files = fileList ? Array.from(fileList) : [];

  const handleSubmit = async (inTime?: Date) => {
    if (loading) {
      return;
    }

    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));

    const safeHtml = DOMPurify.sanitize(htmlContent + await getHTMLMetadata(htmlContent, getMetadata));

    if (editorState.getCurrentContent().getPlainText().trim().length) {
      setEditorState(EditorState.createEmpty());
      setFileList(null);
      if (chat) {
        inTime
          ? await sendDelayMessage(chat.id, safeHtml, files, inTime)
          : await sendMessage(chat.id, safeHtml, files);
      } else if (user) {
        const curChat = await createChat(user.id);
        if (curChat) {
          inTime
            ? await sendDelayMessage(curChat.id, safeHtml, files, inTime)
            : await sendMessage(curChat.id, safeHtml, files);
        }
        setSelectedChat(curChat);
        setSelectedUser(undefined);
      }
    }

    scrollRef?.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleReturn = (event: SyntheticKeyboardEvent, editorState: EditorState): boolean => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      handleSubmit();

      return true;
    }

    return false;
  };

  const handleClickDelay = () => {
    resetItems();
    setShouldLoadDelayed(true);
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = new DataTransfer();
    const newFiles = e.target.files ?? [];
    const allFiles = Array.from(newFiles).concat(files);

    allFiles.forEach((file) => data.items.add(file));

    setFileList(data.files);
  };

  return (
    <div className={styles['wrapper-send-message']}>
      {!isToolbarHidden && <div className={styles['space-for-texttools']}></div>}
      <div className={styles['send-message']}>
        <Editor
          stripPastedStyles
          wrapperClassName={styles['wrapper-class']}
          toolbarClassName={styles['toolbar-class']}
          editorClassName={styles['editor-class']}
          placeholder="Введите сообщение..."
          editorState={editorState}
          onEditorStateChange={setEditorState}
          handleReturn={handleReturn}
          toolbarHidden={isToolbarHidden}
          toolbar={{
            options: ['inline', 'link', 'emoji', 'remove', 'history'],
            inline: {
              className: styles['inside-params'],
              options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
            },
            emoji: {
              className: styles['inside-params'],
              popupClassName: styles['popover-class'],
            },
            link: {
              className: styles['inside-params'],
              popupClassName: styles['popover-class'],
            },
            remove: {
              className: styles['inside-params'],
            },
            history: {
              className: styles['inside-params'],
            },
          }}
          localization={{
            locale: 'ru',
          }}
        />
        <ul className={styles['file-list']}>
          {files.map((file, idx) => (
            <li key={idx} className={styles['file-list-element']}>
              <p className={styles['file-name']}>{file.name}</p>
              <CloseCircleOutlined />
            </li>
          ))}
        </ul>
        <input type={'file'} id={'files'} onChange={handleFileAdd} ref={fileInputRef} multiple hidden/>
        <button className={buttonsStyles['big-icon-svg-button']} onClick={() => fileInputRef.current?.click()}>
          <FileAddOutlined />
        </button>
        <button className={buttonsStyles['big-icon-svg-button']} onClick={handleClickDelay}>
          <CalendarOutlined />
        </button>
        <SendButton
          disabledDelay={editorState.getCurrentContent().getPlainText().trim().length === 0}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default observer(SendMessage);
