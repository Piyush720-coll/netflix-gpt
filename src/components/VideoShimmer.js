const VideoShimmer = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* Background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-gray-900 via-gray-800 to-gray-900
                      animate-pulse" />

      {/* Gradient overlay (same as real UI) */}
      <div className="absolute inset-0 bg-gradient-to-r 
                      from-black via-black/70 to-transparent" />

      {/* Content shimmer */}
      <div className="absolute top-0 left-0 w-full h-screen px-12 
                      pt-[calc(18%+2rem)] max-w-2xl">

        {/* Title shimmer */}
        <div className="h-12 w-3/4 mb-4 rounded-md 
                        bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
                        animate-shimmer" />

        {/* Description shimmer */}
        <div className="space-y-3 mb-6">
          <div className="h-4 w-full rounded bg-gray-700 animate-shimmer" />
          <div className="h-4 w-11/12 rounded bg-gray-700 animate-shimmer" />
          <div className="h-4 w-4/5 rounded bg-gray-700 animate-shimmer" />
        </div>

        {/* Buttons shimmer */}
        <div className="flex gap-4">
          <div className="h-12 w-32 rounded-lg bg-gray-600 animate-shimmer" />
          <div className="h-10 w-28 rounded-md bg-gray-700 animate-shimmer" />
        </div>

      </div>
    </div>
  );
};

export default VideoShimmer;
