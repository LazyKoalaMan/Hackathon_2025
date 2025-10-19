import React, { useState, useCallback } from "react";
import StatPanel from "./components/StatPanel";
import RollModal from "./components/RollModal";
import PlayerInput from "./components/PlayerInput";

function App() {
  // --- Character Data ---
  const playerCharacter = {
    name: "Gimli the Stout",
    level: 3,
    stats: { STR: 18, DEX: 10, CON: 17, INT: 8, WIS: 14, CHA: 7 },
  };

  // --- Dice Roll States ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResult, setRollResult] = useState(null);

  // --- Player Story State ---
  const [story, setStory] = useState([
    "You awaken in a dimly lit tavern. The air smells of ale and smoke. A hooded figure approaches...",
  ]);

  // --- Simulated Backend Dice Roll ---
  const performRoll = useCallback(async () => {
    setIsModalOpen(true);
    setIsRolling(true);
    setRollResult(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200)); // delay
      const result = Math.floor(Math.random() * 20) + 1;
      setRollResult(result);
    } catch (error) {
      console.error("Dice roll failed:", error);
    } finally {
      setIsRolling(false);
    }
  }, []);

  // --- Handle Player Commands ---
  const handlePlayerCommand = (command) => {
    console.log("Player command:", command);
    setStory((prev) => [...prev, `🧙‍♂️ You: ${command}`]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Background visual glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,100,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <header className="w-full text-center py-6 border-b border-yellow-700/40 bg-gray-950/70 backdrop-blur-sm shadow-md">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-wide drop-shadow-[0_0_5px_rgba(255,200,80,0.6)]">
          🪶 Gemnai AI Game Master
        </h1>
        <p className="text-gray-400 text-sm italic mt-1">
          "Welcome to Gemini DnD"
        </p>
      </header>

      {/* Main Layout */}
      <main className="flex flex-col lg:flex-row w-full flex-grow p-6 lg:p-10 space-y-8 lg:space-y-0 lg:space-x-10">
        {/* Left Panel — Character + Dice */}
        <aside className="lg:w-1/3 flex flex-col items-center space-y-8">
          <div className="w-full max-w-md flex flex-row items-center justify-between bg-gray-800/70 border border-yellow-700/30 rounded-xl p-4 shadow-xl">
            {/* Stat Panel */}
            <div className="flex-1 pr-4">
              <StatPanel character={playerCharacter} />
            </div>

            {/* Dice Button */}
            <button
              onClick={performRoll}
              className="py-4 px-6 bg-gradient-to-r from-red-700 to-red-600 text-white text-lg font-bold rounded-xl shadow-lg hover:from-red-600 hover:to-red-500 transition duration-200 border border-yellow-700/30"
            >
              🎲
            </button>
          </div>
        </aside>

        {/* Center — Story Zone */}
        <section className="flex-1 flex flex-col bg-gray-800/70 border border-yellow-700/40 rounded-xl shadow-2xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {story.map((line, index) => (
              <p
                key={index}
                className="mb-3 text-gray-100 whitespace-pre-wrap leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>

          {/* Player Input Area */}
          <div className="border-t border-yellow-700/30">
            <PlayerInput onSendCommand={handlePlayerCommand} />
          </div>
        </section>
      </main>

      {/* Dice Modal */}
      <RollModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        performRoll={performRoll}
        isRolling={isRolling}
        result={rollResult}
      />

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4 border-t border-yellow-700/30 bg-gray-950/60">
        © {new Date().getFullYear()} Gemnai Game Master — A Fantasy AI
        Experience
      </footer>
    </div>
  );
}

export default App;
