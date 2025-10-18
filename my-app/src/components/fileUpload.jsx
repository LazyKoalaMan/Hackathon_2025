import React, { useState } from "react";

function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF file first.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setStatus(data.message);
      onUploadSuccess();
    } catch (err) {
      setStatus("Upload failed.");
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-md text-center">
      <h2 className="text-xl mb-2">📜 Upload DnD Module (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="block mx-auto my-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
      <p className="mt-3 text-green-400">{status}</p>
    </div>
  );
}

export default FileUpload;
