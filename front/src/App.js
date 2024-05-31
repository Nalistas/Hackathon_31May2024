// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import MessageList from './components/MessageList';
import ChatInput from './components/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date().toLocaleTimeString() },
  ]);

  const addMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="App">
      <Header />
      <MessageList messages={messages} />
      <ChatInput addMessage={addMessage} />
    </div>
  );
}

export default App;
