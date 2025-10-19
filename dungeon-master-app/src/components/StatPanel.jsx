import React from 'react';

// Helper function to calculate the D&D Ability Modifier
const calculateModifier = (score) => {
  if (typeof score !== 'number' || score < 1) return 0;
  return Math.floor((score - 10) / 2);
};

// Ability Score order for display consistency
const ABILITY_ORDER = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

/**
 * StatPanel component displays the character's ability scores, modifiers, and level.
 * @param {{name: string, level: number, stats: Object<string, number>}} character - The character object containing stats and identity.
 */
const StatPanel = ({ character }) => {
  // Use mock data if character prop is not provided (for development flexibility)
  const mockCharacter = {
    name: 'Placeholder Hero',
    level: 1,
    stats: { STR: 15, DEX: 14, CON: 13, INT: 12, WIS: 10, CHA: 8 },
  };

  const charData = character || mockCharacter;
  const { name, level, stats } = charData;

  // Render a loading state or default message if core data is missing
  if (!stats) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700">
        Loading Character Stats...
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-2xl border border-gray-700 font-inter max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-6 pb-4 border-b border-gray-700">
        <h1 className="text-3xl font-extrabold text-yellow-400">{name || "Character Name"}</h1>
        <p className="text-lg font-medium text-gray-400">Level: {level || 1}</p>
      </div>

      {/* Ability Score Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {ABILITY_ORDER.map((key) => {
          const score = stats[key] || 10;
          const modifier = calculateModifier(score);
          const displayModifier = modifier >= 0 ? `+${modifier}` : modifier;
          
          return (
            <div
              key={key}
              className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-700 shadow-inner hover:bg-gray-600 transition duration-150 ease-in-out"
            >
              {/* Score Name */}
              <div className={`text-sm font-semibold mb-1 tracking-wider ${key === 'STR' ? 'text-red-300' : key === 'DEX' ? 'text-green-300' : key === 'CON' ? 'text-blue-300' : key === 'INT' ? 'text-cyan-300' : key === 'WIS' ? 'text-amber-300' : 'text-purple-300'}`}>
                {key}
              </div>

              {/* Modifier (Big Number) */}
              <div className={`text-4xl font-bold ${modifier >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {displayModifier}
              </div>

              {/* Score (Small Number) */}
              <div className="text-xs mt-1 text-gray-400 border border-gray-500 rounded-full px-2 py-0.5 bg-gray-800">
                Score: {score}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Example Usage/Note */}
      <p className="mt-6 text-center text-sm text-gray-500 italic">
        These core stats will be factored into the DM's challenge rating and narrative descriptions.
      </p>
    </div>
  );
};

// Example Usage (for testing purposes, you would use this in your main App component)
/*
const ExampleApp = () => {
    const playerCharacter = {
        name: 'Gimli the Stout',
        level: 3,
        stats: { STR: 18, DEX: 10, CON: 17, INT: 8, WIS: 14, CHA: 7 },
    };

    return <StatPanel character={playerCharacter} />;
};
export default ExampleApp;
*/

export default StatPanel;
