/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { CalendarOutlined, CloseOutlined, FileAddOutlined } from '@ant-design/icons';
import DOMPurify from 'dompurify';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import clsx from 'clsx';
import { Tooltip, message } from 'antd';
import { chatsStore, messagesStore, userStore } from '../../../../stores';
import SendButton from '../SendButton';
import { getHTMLMetadata } from './getHTMLMetadata';
import styles from './SendForm.module.scss';
import buttonsStyles from '../../../../styles/buttons.module.scss';
import { useScroll } from '../../../../hooks';

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
  setShouldLoadDelayed: (value: boolean) => void;
  isToolbarHidden: boolean;
  setFileBoxHeight: (value: number) => void;
};

const SendMessage: React.FC<Props> = ({
  scrollRef,
  setShouldLoadDelayed,
  isToolbarHidden,
  setFileBoxHeight,
}) => {
  const {
    loading, sendMessage, sendDelayMessage, resetItems,
  } = messagesStore;
  const {
    selectedItem: chat, setSelectedChat, getMetadata, createChat,
  } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());
  const [fileList, setFileList] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ref: refAttachments } = useScroll<HTMLDivElement>();

  const files = fileList ? Array.from(fileList) : [];

  const handleSubmit = async (inTime?: Date) => {
    if (loading) {
      return;
    }

    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));

    const safeHtml = DOMPurify.sanitize(htmlContent + await getHTMLMetadata(htmlContent, getMetadata));

    if (editorState.getCurrentContent().getPlainText().trim().length || fileList?.length) {
      setEditorState(EditorState.moveFocusToEnd(EditorState.createEmpty()));
      setFileList(null);
      setFileBoxHeight(0);
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

  const setFileListByFiles = (files: File[]) => {
    let boxHeight = 0;
    const data = new DataTransfer();

    files.forEach((file) => {
      if (file.type.startsWith('image')) {
        boxHeight = Math.max(boxHeight, 60);
      } else {
        boxHeight = Math.max(boxHeight, 36);
      }
      data.items.add(file);
    });

    setFileBoxHeight(boxHeight);
    setFileList(data.files);
  };

  const handleFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ?? [];
    if (files.length + newFiles.length > 10) {
      message.warning('Нельзя загрузить больше 10 файлов');
    }
    const allFiles = Array.from(newFiles)
      .slice(0, Math.min(newFiles.length, 10 - files.length))
      .concat(files);

    setFileListByFiles(allFiles);
  };

  const handleDeleteFile = (idx: number) => {
    if (files.length === 1) {
      setFileList(null);
      setFileBoxHeight(0);

      return;
    }

    setFileListByFiles(files.filter((_fileItem, curIdx) => idx !== curIdx));
  };

  return (
    <div className={styles['wrapper-send-message']}>
      {files.length > 0
        && (
        <div className={styles['attachments-wrapper']}>
          <div ref={refAttachments} className={styles.attachments}>
            {files.map((file, idx) => (
              <div key={file.name} className={styles.attachment}>
                <Tooltip title={file.name}>
                  {file.type.startsWith('image')
                    ? (
                      <div className={styles['image-preview']}>
                        <img className={styles.image} alt={file.name} src={URL.createObjectURL(file)} />
                        <span className={clsx(styles['attachment-close'], styles['image-close'])}>
                          <CloseOutlined className={styles['attachment-close']} onClick={() => handleDeleteFile(idx)} />
                        </span>
                      </div>
                    )
                    : (
                      <div className={styles['file-attachment']}>
                        <p className={styles['attachment-name']}>{file.name}</p>
                        <CloseOutlined className={styles['attachment-close']} onClick={() => handleDeleteFile(idx)} />
                      </div>
                    )}
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
        )}
      {!isToolbarHidden && <div className={styles['space-for-texttools']} />}
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
        <input type="file" id="files" onChange={handleFileAdd} ref={fileInputRef} multiple hidden />
        <button
          type="button"
          aria-label="Attach images"
          className={buttonsStyles['big-icon-svg-button']}
          onClick={() => fileInputRef.current?.click()}
        >
          <FileAddOutlined />
        </button>
        <button
          type="button"
          aria-label="Delayed messages"
          className={buttonsStyles['big-icon-svg-button']}
          onClick={handleClickDelay}
        >
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
