// src/components/ChatInput.js
import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ addMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form className="chat-input gap-4 px-5" onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatInput;
