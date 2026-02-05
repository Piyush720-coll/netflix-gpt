const HeaderShimmer = () => {
  return (
    <div className="w-full h-16 px-8 flex items-center justify-between
                    bg-black border-b border-white/10">

      {/* Left: Logo shimmer */}
      <div className="h-8 w-28 rounded-md
                      bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
                      bg-[length:200%_100%] animate-shimmer" />

      {/* Right: Profile + buttons shimmer */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-20 rounded
                        bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
                        bg-[length:200%_100%] animate-shimmer" />
        <div className="h-9 w-9 rounded-full
                        bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700
                        bg-[length:200%_100%] animate-shimmer" />
      </div>
    </div>
  );
};

export default HeaderShimmer;
