export const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent text-white z-10">
      <div className="pt-[20%] px-12 max-w-2xl group">

        {/* Title */}
        <h1
          className="text-5xl font-extrabold tracking-wide mb-3
                     translate-y-14
                     group-hover:translate-y-0
                     transition-transform duration-500 ease-out"
        >
          {title}
        </h1>

        {/* Description */}
        <p
          className="text-lg text-gray-200 mb-6 max-w-xl
                     opacity-0 translate-y-4 blur-sm
                     group-hover:opacity-100
                     group-hover:translate-y-0
                     group-hover:blur-0
                     transition-all duration-500 ease-out delay-150"
        >
          {overview}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 items-center">

          {/* Play */}
          <button
            className="flex items-center gap-3 bg-white text-black
                       px-7 py-3 rounded-lg font-bold text-lg
                       shadow-lg shadow-black/40
                       hover:scale-105 hover:bg-gray-200
                       active:scale-95
                       transition-all duration-300"
          >
            <img
              src="https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-play-icon-png-image_956416.jpg"
              alt="Play"
              className="w-6 h-6 object-contain"
            />
            Play
          </button>

          {/* More Info */}
          <button
            className="flex items-center gap-2 px-5 py-4
                       bg-gray-600/70 hover:bg-gray-600
                       hover:scale-105 active:scale-95
                       rounded-lg text-white font-medium
                       transition-all duration-300"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/43/Minimalist_info_Icon.png"
              alt="Info"
              className="w-5 h-5 object-contain invert"
            />
            More Info
          </button>

        </div>
      </div>
    </div>
  );
};
