import { useRef, useState } from "react";
import MovieCart from "./MovieCart";

const MovieList = ({ title, movies }) => {
  const sliderRef = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);

  if (!movies || movies.length === 0) return null;

  const scrollAmount = 700;

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // ✅ Prevent page scroll when inside slider
  const handleWheel = (e) => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;

    const atStart = container.scrollLeft === 0;
    const atEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth;

    if (
      (e.deltaY < 0 && !atStart) ||
      (e.deltaY > 0 && !atEnd)
    ) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  };

  // ✅ Drag to scroll (Netflix feel)
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeftPos(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  return (
    <div className="px-8 py-4 text-white relative group">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-4 tracking-wide">
        {title}
      </h1>

      {/* Left Button */}
      <button
        onClick={scrollLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 
                   bg-black/60 hover:bg-black p-3 rounded-full
                   opacity-0 group-hover:opacity-100
                   transition-all duration-300 ease-in-out
                   hover:scale-110 z-10"
      >
        <img
          src="https://freepngimg.com/download/play_button/25569-6-play-button-transparent.png"
          alt="Scroll Left"
          className="w-6 h-6 object-contain rotate-180"
        />
      </button>

      {/* Movie Row */}
      <div
        ref={sliderRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        className="flex gap-4
                   scrollbar-hide
                   scroll-smooth
                   cursor-pointer
                   overscroll-contain
                   overflow-hidden"
      >
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="transition-transform duration-300 hover:scale-105 ease-in-out"
          >
            <MovieCart movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={scrollRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 
                   bg-black/60 hover:bg-black p-3 rounded-full
                   opacity-0 group-hover:opacity-100
                   transition-all duration-300 ease-in-out
                   hover:scale-110 z-10"
      >
        <img
          src="https://freepngimg.com/download/play_button/25569-6-play-button-transparent.png"
          alt="Scroll Right"
          className="w-6 h-6 object-contain"
        />
      </button>
    </div>
  );
};

export default MovieList;
