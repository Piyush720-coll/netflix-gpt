// useTvShows.js
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constrains";
import { useDispatch } from "react-redux";
import { addTvShows } from "../utils/moviesSlice";

const useTvShows = () => {
  const dispatch = useDispatch();

  // Get today's date in IST
  const getISTDate = () => {
    const now = new Date();

    // Convert to IST (UTC + 5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset - now.getTimezoneOffset() * 60000);

    return istTime.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const getTvShows = async () => {
    try {
      const istDate = getISTDate();

      const data = await fetch(
        `https://api.themoviedb.org/3/trending/tv/day?language=en-US&region=IN`,
        API_OPTIONS
      );

      const json = await data.json();

      if (json?.results) {
        dispatch(addTvShows(json.results));
      }
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  };

  useEffect(() => {
    getTvShows();
  }, [dispatch]);
};

export default useTvShows;
