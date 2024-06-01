// src/components/Message.js
import React from 'react';
import './Message.css';

function Message({ text, sender }) {
  const isBot = sender === "bot";

  return (
    <div className={`flex items-start gap-2.5 ${isBot ? "" : "justify-end"}`}>
      <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border ${isBot ? "border-gray-200 bg-gray-100 dark:bg-gray-700 rounded-e-xl rounded-es-xl" : "border-blue-500 bg-blue-100 dark:bg-blue-700 rounded-s-xl rounded-ss-xl"}`}>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{text}</p>
      </div>
    </div>
  );
}


export default Message;
