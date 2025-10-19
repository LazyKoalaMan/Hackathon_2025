import React, { useState, useCallback } from 'react';
import StatPanel from './components/StatPanel';
import RollModal from './components/RollModal'; // ✅ Import your new RollModal

function App() {
  // --- Character Data ---
  const playerCharacter = {
    name: 'Gimli the Stout',
    level: 3,
    stats: { STR: 18, DEX: 10, CON: 17, INT: 8, WIS: 14, CHA: 7 },
  };

  // --- Dice Roll States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResult, setRollResult] = useState(null);

  // --- Simulated Backend Dice Roll ---
  const performRoll = useCallback(async () => {
    setIsModalOpen(true);
    setIsRolling(true);
    setRollResult(null);

    try {
      // Simulate rolling a D20 (1–20)
      await new Promise((resolve) => setTimeout(resolve, 1200)); // delay
      const result = Math.floor(Math.random() * 20) + 1;
      setRollResult(result);
    } catch (error) {
      console.error('Dice roll failed:', error);
    } finally {
      setIsRolling(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      {/* Character Panel */}
      <StatPanel character={playerCharacter} />

      {/* Roll Button */}
      <button
        onClick={performRoll}
        className="mt-8 py-3 px-8 bg-red-600 text-white text-lg font-bold rounded-xl shadow-md hover:bg-red-700 transition duration-200"
      >
        🎲 Roll D20
      </button>

      {/* Dice Modal */}
      <RollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        performRoll={performRoll}
        isRolling={isRolling}
        result={rollResult}
      />
    </div>
  );
}

export default App;
