import Header from "./Header";

const MyList = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      {/* Page Content */}
      <div className="pt-28 px-10">
        <h1 className="text-3xl font-bold mb-6">My List</h1>
        <p className="text-gray-400">
          Your saved movies and TV shows will appear here.
        </p>
      </div>
    </div>
  );
};

export default MyList;
