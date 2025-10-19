import React, { useRef, useEffect } from 'react';

/**
 * MessageLog component displays the chronological history of the campaign
 * and automatically scrolls to the bottom when new messages are added.
 * * @param {Array} history - Array of { sender: 'DM'|'Player', text: '...' } messages.
 */
const MessageLog = ({ history }) => {
  // Ref to target the scrollable container
  const scrollRef = useRef(null);

  // Effect to run whenever the history array changes
  useEffect(() => {
    if (scrollRef.current) {
      // Set the scroll position to the bottom of the content
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]); // Re-run effect whenever history changes

  return (
    <div 
      ref={scrollRef} // Attach the ref to the scrollable div
      className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-800 rounded-t-xl border border-gray-700 h-[60vh] custom-scrollbar"
    >
      {history.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.sender === 'Player' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-3/4 p-3 rounded-lg shadow-md transition-all duration-300
              ${message.sender === 'DM' 
                ? 'bg-red-900/50 border border-red-800 text-gray-200' 
                : 'bg-yellow-900/50 border border-yellow-800 text-gray-100'
              }`}
          >
            <strong className={`font-mono text-sm ${message.sender === 'DM' ? 'text-red-400' : 'text-yellow-400'}`}>
              {message.sender}:
            </strong>
            <p className="mt-1 whitespace-pre-wrap">{message.text}</p>
          </div>
        </div>
      ))}
      {/* Invisible element to ensure the scroll container always hits the bottom */}
      <div style={{ float:"left", clear: "both" }} />
    </div>
  );
};

export default MessageLog;
