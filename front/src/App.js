// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import DiscussionList from './components/DiscussionList';
import Discussion from './components/Discussion';
import './App.css';

function App() {
  const [discussions, setDiscussions] = useState([
    { id: 1, title: "Lesson 1", messages: [{ id: 1, text: "Hello! How can I help you today?", sender: "bot" }] },
  ]);
  const [currentDiscussionId, setCurrentDiscussionId] = useState(discussions[0].id);
  const [nextDiscussionId, setNextDiscussionId] = useState(discussions.length + 1);

  const addMessage = (text, bot_response) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === currentDiscussionId) {
        return {
          ...discussion,
          messages: [
            ...discussion.messages,
            { id: discussion.messages.length + 1, text, sender: "user" },
            { id: discussion.messages.length + 2, text: bot_response, sender: "bot" }
          ]
        };
      }
      return discussion;
    }));
  };

  const addDiscussion = async () => {
    // const response = await fetch("http://localhost:5000/api/create", {
    //   method: "POST",
    //   headers: {},
    //   body: JSON.stringify({}),
    // });

    const newDiscussion = {
      id: nextDiscussionId,
      title: `Lesson ${nextDiscussionId}`,
      messages: [],
    };
    setDiscussions([...discussions, newDiscussion]);
    setCurrentDiscussionId(newDiscussion.id);
    setNextDiscussionId(nextDiscussionId + 1);
  };

  const currentDiscussion = discussions.find(d => d.id === currentDiscussionId);

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <DiscussionList discussions={discussions} setCurrentDiscussionId={setCurrentDiscussionId} addDiscussion={addDiscussion} />
        <Discussion discussion={currentDiscussion} addMessage={addMessage} />
      </div>
    </div>
  );
}

export default App;
