import React, { useState } from 'react';
import { Send } from 'lucide-react';

/**
 * PlayerInput component handles the command text input and submission.
 * It takes an 'onSendCommand' prop (a function) to pass the message up to the parent.
 */
const PlayerInput = ({ onSendCommand }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCommand = command.trim();
    
    if (trimmedCommand) {
      // Pass the trimmed command to the parent handler
      onSendCommand(trimmedCommand);
      // Clear the input field
      setCommand('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-700 border-t-2 border-yellow-700/50 rounded-b-xl shadow-xl">
      <div className="flex space-x-3">
        {/* Text Input Area */}
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="What do you do? (e.g., 'I open the door')"
          className="flex-grow p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition duration-150"
          autoFocus
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={!command.trim()}
          className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition duration-150 disabled:bg-gray-500 disabled:cursor-not-allowed"
          aria-label="Send Command"
        >
          <Send size={20} className="mr-1" /> Send
        </button>
      </div>
    </form>
  );
};

export default PlayerInput;
