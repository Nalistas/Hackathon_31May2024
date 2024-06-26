// src/components/DiscussionList.js
import React from 'react';
import './DiscussionList.css';

function DiscussionList({ discussions, setCurrentDiscussionId, addDiscussion }) {
  return (
    <div className="discussion-list">
      <h2>Discussions</h2>
      {discussions.map(discussion => (
        <div
          key={discussion.id}
          className="p-2 cursor-pointer border-b-4 hover:bg-white"
          onClick={() => setCurrentDiscussionId(discussion.id)}
        >
          {discussion.title}
        </div>
      ))}
      <div className="new-discussion">
        <button onClick={addDiscussion}>Add Discussion</button>
      </div>
    </div>
  );
}

export default DiscussionList;
