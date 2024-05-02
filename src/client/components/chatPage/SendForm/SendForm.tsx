import React, { useState } from 'react';
import { Form, Input, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import DOMPurify from 'dompurify';
import { EditorState, convertToRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { chatsStore, messagesStore, userStore } from '../../../stores';
import { chatApiClient } from '../../../hands';
import './SendForm.css';

const SendMessage: React.FC = () => {
  const { sendMessage, loading } = messagesStore;
  const { selectedItem: chat, setSelectedChat } = chatsStore;
  const { selectedUser: user, setSelectedUser } = userStore;

  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty());

  const handleSubmit = async () => {
    const contentState = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(contentState));
    const safeHtml = DOMPurify.sanitize(htmlContent);
    
    if (safeHtml !== '<p></p>') {
      if (chat) {
        await sendMessage(chat.id, safeHtml);      
      } else if (user) {
        const chat = await chatApiClient.createChat(user.id);
        await sendMessage(chat.id, safeHtml);
        setSelectedChat(chat);
        setSelectedUser(undefined);
      }
    }

    setEditorState(EditorState.createEmpty());
  }

  const handleEnter = (e: React.KeyboardEvent<Element>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Form className="send-message">
      <Editor
        stripPastedStyles
        placeholder="Введите сообщение..."
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: ['inline', 'link', 'emoji', 'remove', 'history'],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
          },
          emoji: {
            emojis: ['☠️', '❤️', '😩'],
          },
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
    </Form>
  );
};

export default observer(SendMessage);
