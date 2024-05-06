import React, { useState } from 'react';
import { Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import DOMPurify from 'dompurify';
import { EditorState, convertToRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
// import { findEntities } from 'draft-js-utils';
import { Editor, SyntheticKeyboardEvent } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { chatsStore, messagesStore, userStore } from '../../../stores';
import { chatApiClient } from '../../../hands';
import './SendForm.css';

type Props = {
  scrollRef: React.RefObject<HTMLDivElement>;
};

const SendMessage: React.FC<Props> = ({ scrollRef }) => {
  const { sendMessage, loading } = messagesStore;
  const { selectedItem: chat, setSelectedChat, getMetadata } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  const handleSubmit = async () => {
    // const data = await getMetadata('https://vk.com/wall-100889999_6963');
    // const data = await getMetadata('https://github.com/RemiixInc/meta-grabber/blob/main/server.js');
    // console.log(data);
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const safeHtml = DOMPurify.sanitize(htmlContent);

    // console.log(findEntities(contentState, 'LINK'));
    
    // if (editorState.getCurrentContent().hasText()) {
    //   if (chat) {
    //     await sendMessage(chat.id, safeHtml);      
    //   } else if (user) {
    //     const chat = await chatApiClient.createChat(user.id);
    //     await sendMessage(chat.id, safeHtml);
    //     setSelectedChat(chat);
    //     setSelectedUser(undefined);
    //   }
    // }

    // setEditorState(EditorState.createEmpty());
  
    // scrollRef?.current?.scrollTo({
    //   top: scrollRef.current.scrollHeight,
    //   behavior: "smooth"
    // });
  }

  const handleReturn = (event: SyntheticKeyboardEvent, editorState: EditorState): boolean => {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      handleSubmit();
      return true;
    }
    return false;
  }

  return (
    <div className="send-message">
      <Editor
        stripPastedStyles
        wrapperClassName="wrapper-class"
        toolbarClassName="toolbar-class"
        editorClassName="editor-class"
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
            popupClassName: 'popover-class',
          },
          link: {
            popupClassName: 'popover-class',
          }
        }}
        localization={{
          locale: 'ru',
        }}
      />
      {loading 
      ? <Spin className="send-button" />
      : (
          <button className="send-button" onClick={handleSubmit}>
            <SendOutlined />
          </button>
      )}
    </div>
  );
};

export default observer(SendMessage);
