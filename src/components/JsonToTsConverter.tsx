"use client";

import React, { useState } from "react";
import { jsonToTsInterface } from "@/utils/jsonToTsInterface";

export default function JsonToTsConverter() {
  const [jsonInput, setJsonInput] = useState("");
  const [tsOutput, setTsOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // This will eventually do the conversion!
  const handleConvert = () => {
    try {
      setError("");
      const parsed = JSON.parse(jsonInput);
      const ts = jsonToTsInterface(parsed, "RootObject");
      setTsOutput(ts);
    } catch (e: any) {
      setError("Invalid JSON");
      setTsOutput("");
    }
  };

  return (
    <div className="w-full text-center max-w-4xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">JSON2TS</h2>
      <p className="mb-4 text-gray-600">
        Convert JSON to TypeScript interfaces instantly.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
        {/* JSON Input */}
        <textarea
          className="flex-1 min-h-[250px] p-2 border rounded"
          placeholder="Paste your JSON here..."
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
        />

        {/* TS Output */}
        <textarea
          className="flex-1 min-h-[250px] p-2 border rounded bg-gray-100"
          placeholder="TypeScript interfaces..."
          value={tsOutput}
          readOnly
        />
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2 justify-center">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleConvert}
        >
          Convert
        </button>
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => {
            if (tsOutput) {
              navigator.clipboard.writeText(tsOutput);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500); // 1.5 seconds
            }
          }}
          disabled={!tsOutput}
        >
          Copy Output
          {copied && <span className="ml-2 text-green-600">Copied!</span>}
        </button>
        {error && <span className="ml-4 text-red-600">{error}</span>}
      </div>
    </div>
  );
}
