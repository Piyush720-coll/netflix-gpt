import { API_OPTIONS } from "./constrains";

const SearchMovie = async (title) => {
  if (!title || title.trim() === "") return null; // handle empty search

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}`,
      API_OPTIONS
    );

    if (!response.ok) {
      console.error("Failed to fetch movies:", response.statusText);
      return null;
    }

    const data = await response.json();
    return data.results || []; // return the array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
};

export default SearchMovie;
