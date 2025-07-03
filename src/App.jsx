// File: src/App.jsx
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Copy, Sun, Moon, WandSparkles } from "lucide-react";

const generatePassword = (length = 12, options = {}) => {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]|:;<>?,./";
  let characters = "";

  if (options.uppercase) characters += upper;
  if (options.lowercase) characters += lower;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  if (!characters) return "";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
};

function App() {
  const [length, setLength] = useState(12);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("dark") === "true"
  );

  useEffect(() => {
    localStorage.setItem("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Roboto&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.fontFamily = "'Roboto', sans-serif";
  }, []);

  const handleGenerate = () => {
    setPassword(generatePassword(length, options));
  };

  const handleCopy = async () => {
    if (password) {
      await navigator.clipboard.writeText(password);
      toast.success("Password copied to clipboard!");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 flex flex-col items-center justify-center px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <Toaster position="top-center" />
      <div
        className={`p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all duration-300 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
        } animate-fade-in`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-center w-full">
            🔐 Password Generator
          </h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="ml-4 p-2 rounded-md transition-transform duration-200 hover:rotate-12 hover:bg-yellow-400"
          >
            {darkMode ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="length" className="block text-sm font-medium mb-1">
            Password Length: <span className="font-semibold">{length}</span>
          </label>
          <input
            id="length"
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
              darkMode ? "bg-blue-400" : "bg-blue-200"
            }`}
          />
        </div>

        <button
          onClick={handleGenerate}
          className="w-full mb-4 text-lg font-medium gap-2 transition-transform duration-300 hover:scale-105 hover:bg-blue-700 dark:hover:bg-blue-500 flex items-center justify-center py-2 px-4 rounded-md bg-blue-600 text-white hover:cursor-pointer"
        >
          <WandSparkles className="w-4 h-4 mr-2" /> Generate Password
        </button>

        {password && (
          <>
            <div
              className={`p-4 rounded-xl text-center font-mono break-words select-all mb-3 text-base transition-opacity duration-300 ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              {password}
            </div>
            <button
              onClick={handleCopy}
              className="w-full mb-6 text-base font-medium gap-2 transition-transform duration-300 hover:scale-105 hover:bg-green-600 flex items-center justify-center py-2 px-4 rounded-md bg-green-500 text-white hover:cursor-pointer"
            >
              <Copy className="w-4 h-4 mr-2" /> Copy to Clipboard
            </button>
          </>
        )}

        <div className="grid grid-cols-1 gap-3">
          {Object.entries(options).map(([key, value]) => (
            <label
              key={key}
              className="flex items-center space-x-2 text-sm capitalize"
            >
              <input
                type="checkbox"
                checked={value}
                onChange={(e) =>
                  setOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                }
                className="accent-blue-600"
              />
              <span>Include {key}</span>
            </label>
          ))}
        </div>
      </div>
      <p className="mt-6 text-xs text-gray-500">Created by: Aman Ahamed</p>
    </div>
  );
}

export default App;
