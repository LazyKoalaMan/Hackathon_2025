import React, { useEffect, useState } from "react";
import { X, RotateCcw } from "lucide-react";

const RollModal = ({ isOpen, onClose, performRoll, result, isRolling }) => {
  const [displayNumber, setDisplayNumber] = useState(null);
  const [rollingAnim, setRollingAnim] = useState(false);

  useEffect(() => {
    if (isRolling) {
      // Start fast random flicker before final result
      setRollingAnim(true);
      let counter = 0;
      const flicker = setInterval(() => {
        setDisplayNumber(Math.floor(Math.random() * 20) + 1);
        counter++;
      }, 60);

      // Stop flicker when roll is done
      const stop = setTimeout(() => {
        clearInterval(flicker);
        setRollingAnim(false);
        setDisplayNumber(result);
      }, 1200);

      return () => {
        clearInterval(flicker);
        clearTimeout(stop);
      };
    } else if (result) {
      setDisplayNumber(result);
    }
  }, [isRolling, result]);

  if (!isOpen) return null;

  // Determine outcome color/message
  const getResultMessage = () => {
    if (displayNumber === 20)
      return <span className="text-green-400 font-bold">CRITICAL SUCCESS!</span>;
    if (displayNumber === 1)
      return <span className="text-red-500 font-bold">CRITICAL FAILURE!</span>;
    return <span className="text-gray-200">You rolled a {displayNumber}.</span>;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="relative bg-gray-900 border border-yellow-500 rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          {isRolling ? "Rolling the Dice..." : "Your Result"}
        </h2>

        {/* Dice display area */}
        <div className="flex justify-center items-center mb-6">
          <div
            className={`relative w-32 h-32 flex items-center justify-center rounded-3xl border-8 text-white font-extrabold text-6xl select-none
              ${
                rollingAnim
                  ? "bg-red-700 border-yellow-400 animate-pulse"
                  : displayNumber === 20
                  ? "bg-green-700 border-green-400"
                  : displayNumber === 1
                  ? "bg-red-800 border-red-500"
                  : "bg-blue-800 border-blue-400"
              }`}
            style={{
              boxShadow: "0 0 25px rgba(255, 255, 255, 0.1)",
            }}
          >
            {displayNumber ?? "?"}
          </div>
        </div>

        {/* Result message */}
        <div className="text-center text-lg mb-4">
          {isRolling ? (
            <p className="text-gray-400 italic">The die tumbles...</p>
          ) : (
            getResultMessage()
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-6">
          {!isRolling && (
            <button
              onClick={performRoll}
              className="flex items-center justify-center space-x-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
            >
              <RotateCcw size={18} />
              <span>Roll Again</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-5 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RollModal;
