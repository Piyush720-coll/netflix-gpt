import React, { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Header */}
      <div className="relative z-30">
        <Header />
      </div>

      {/* Background */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/cc73e7c7-7860-4ef4-8fc8-1baf24569d2f/web/IN-en-20260126-TRIFECTA-perspective_90d714e8-acc9-4253-ab46-ca6b349c1989_small.jpg"
        alt="Netflix Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Auth Card */}
      <form
        className={`absolute z-20 top-1/2 left-1/2 w-[380px] 
        -translate-x-1/2 -translate-y-1/2 
        bg-black/80 p-8 rounded-lg shadow-2xl
        transition-all duration-500 ease-in-out`}
      >
        <h1 className="text-white text-3xl font-bold mb-6">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4">
          {/* Full Name (only for Sign Up) */}
          <div
            className={`transition-all duration-300 overflow-hidden ${
              !isSignInForm
                ? "max-h-20 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <input
            type="email"
            placeholder="Email address"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>

        {/* Button */}
        <button
          className="mt-6 w-full bg-red-600 hover:bg-red-700 
          text-white p-3 rounded font-semibold 
          transition-transform duration-200 hover:scale-[1.02]"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle text */}
        <p className="mt-6 text-gray-400 text-sm text-center">
          {isSignInForm ? "New to Netflix?" : "Already have an account?"}{" "}
          <span
            onClick={toggleSignInForm}
            className="text-white cursor-pointer hover:underline transition-colors"
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
