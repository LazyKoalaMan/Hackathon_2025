// import React, { useState } from "react";
// import ChatBox from "./components/ChatBox";
// import LoadingAnimation from "./components/LoadingAnimation";
// import "./styles/app.css";
import FileUpload from "./components/fileUpload2";
import GameScreen from "./components/Gamescreen";

import React from "react";
import { FileInput, Label } from "flowbite-react";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-6">📜 Upload Your DnD Module</h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <Label className="mb-2 block" htmlFor="file-upload">
          Upload file
        </Label>
        <FileInput id="file-upload" />
      </div>
    </div>
  );
}

export default App;
