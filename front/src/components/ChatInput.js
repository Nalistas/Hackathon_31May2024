import React, { useState } from 'react';
import './ChatInput.css';

function ChatInput({ addMessage }) {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = inputValue;
      setInputValue('');

      try {
        const response = await fetch("http://localhost:5000/api/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: userMessage }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Combine user message and server response in a single call to addMessage
        addMessage(userMessage, data.message);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to send message to the server');
      }
    }
  };

  return (
    <>
      <form className="chat-input gap-4 px-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </>
  );
}

export default ChatInput;
