// src/components/Discussion.js
import React from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import './Discussion.css';

function Discussion({ discussion, addMessage }) {
  return (
    <div className="flex flex-col h-full w-full">
      <h2>{discussion.title}</h2>
      <MessageList messages={discussion.messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
}

export default Discussion;
