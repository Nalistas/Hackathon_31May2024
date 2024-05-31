// src/components/MessageList.js
import React from 'react';
import Message from './Message';
import './MessageList.css';

function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <Message key={message.id} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
}

export default MessageList;
