import { useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import WatchPage from "./WatchPage";
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import SearchPage from "./SearchPage";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    { 
      path: "/", 
      element: <Login /> 
    },
    { 
      path: "/browse", 
      element: (
      <PrivateRoute>
        <Browse /> 
      </PrivateRoute>
      )
    },
    { 
      path: "/watch/:id", 
      element: (
      <PrivateRoute>
        <WatchPage />
      </PrivateRoute>
      )
    }, // ✅ dynamic param
    {
      path: "/search", 
      element: (
      <PrivateRoute>
        <SearchPage />
      </PrivateRoute>
      )
    }
  ]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
