import React from 'react';

// Placeholder data since we don't have the backend connection yet
const placeholderStats = {
  STR: 14, DEX: 12, CON: 16, INT: 10, WIS: 15, CHA: 8
};

// Function to calculate D&D modifier: (Score - 10) / 2, rounded down
const getModifier = (score) => Math.floor((score - 10) / 2);

const StatPanel = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-red-700/50">
      <h3 className="text-2xl font-bold text-red-400 mb-4 border-b border-red-800 pb-2">
        Character Sheet (Placeholder)
      </h3>
      <div className="space-y-3">
        {Object.entries(placeholderStats).map(([statName, score]) => (
          <div key={statName} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
            <span className="text-lg font-semibold text-gray-200">{statName}</span>
            <div className="flex items-center space-x-3">
              <span className="text-lg text-yellow-500 font-mono">
                {score}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm font-bold ${getModifier(score) >= 0 ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                {getModifier(score) >= 0 ? '+' : ''}{getModifier(score)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-gray-400">
        *This is a basic placeholder. Real data will load from your Django backend.
      </p>
    </div>
  );
};

export default StatPanel;
