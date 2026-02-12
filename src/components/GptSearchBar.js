import { useRef, useState, useEffect } from "react";

export const GptSearchBar = () => {
  const searchText = useRef(null);
  const [showMessage, setShowMessage] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleGptSearchClick = async () => {
    try {
      setShowMessage(true);
      setFadeOut(false);

      // Start fade out after 4 seconds
      setTimeout(() => {
        setFadeOut(true);
      }, 4000);

      // Remove completely after 5 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 5000);

    } catch (error) {
      console.error("Groq Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-40 mt-10 px-4">
      <form
        className="flex items-center w-full max-w-2xl 
        bg-black/60 backdrop-blur-md 
        border border-purple-500/40 
        rounded-xl shadow-lg overflow-hidden"
        onSubmit={(e) => {
          e.preventDefault();
          handleGptSearchClick();
        }}
      >
        <input
          ref={searchText}
          type="text"
          placeholder="What would you like to watch today?"
          className="flex-1 px-6 py-3 
          bg-transparent text-white 
          placeholder-gray-400 
          focus:outline-none"
        />

        <button
          type="submit"
          className="px-6 py-3 
          bg-gradient-to-r from-purple-600 via-pink-600 to-red-600
          text-white font-semibold
          transition-all duration-300
          hover:scale-105 hover:shadow-purple-500/50
          active:scale-95"
        >
          🚀 Search
        </button>
      </form>

      {/* Fade Message */}
      {showMessage && (
        <div
          className={`mt-6 px-6 py-3 
          bg-gradient-to-r from-purple-700/80 to-pink-700/80 
          text-white rounded-lg shadow-xl
          backdrop-blur-md
          transition-all duration-1000
          ${fadeOut ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}
        >
          🚧 GPT Movie Search is under construction. Coming soon!
        </div>
      )}
    </div>
  );
};

