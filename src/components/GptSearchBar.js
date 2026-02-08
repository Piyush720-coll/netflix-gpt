import { useRef } from "react";
import ai from "../utils/geminiMovies"; // Your Gemini AI instance

export const GptSearchBar = () => {
  const searchText = useRef(null);

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value;
    if (!userQuery) return;

    const aiResult = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: "user",
          text: `Act as a movie recommendation system and suggest 5 movies for the query: "${userQuery}". Only give me names, comma separated. Example: Gadar, Sholay, Don, Golmal, Koi Mil Gya`
        }
      ]
    });

    const movieText = aiResult?.candidates;


    console.log(movieText); // ✅ debug output
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
