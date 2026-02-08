import { BG_URL } from "../utils/constrains";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { GptSearchBar } from "./GptSearchBar";

const GptSearch = () => {
  return (
    <div>
        <img
        src={BG_URL}
        alt="Netflix Banner"
        className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 mix-blend-darken"></div>
        <GptSearchBar />
        <GptMovieSuggestions />
    </div>
  )
}

export default GptSearch;