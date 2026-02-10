import { useRef } from "react";
import { getGroqChatCompletion } from "../utils/gptMovies";

export const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    try {
      const userQuery = searchText.current.value;
      if (!userQuery) return;

      const completion = await getGroqChatCompletion(userQuery);

      const result = completion.choices[0]?.message?.content || "";

      // Optional: convert to array
      const moviesArray = result.split(",").map((movie) => movie.trim());

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
    </div>
  );
};
