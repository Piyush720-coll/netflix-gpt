import { useEffect } from "react";
import Browse from "./Browse";
import Login from "./Login";
import WatchPage from "./WatchPage"; // Movies watch page
import WatchPageTv from "./WatchPageTv"; // TV Shows watch page
import PrivateRoute from "./PrivateRoute";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import SearchPage from "./SearchPage";
import Movies from "./Movies";
import TVShows from "./TVShows";
import MyList from "./MyList";

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
      path: "/movies", 
      element: (
        <PrivateRoute>
          <Movies />
        </PrivateRoute>
      )
    },

    { 
      path: "/tv", 
      element: (
        <PrivateRoute>
          <TVShows />
        </PrivateRoute>
      )
    },

    { 
      path: "/watch/tv/:id",
      element: (
        <PrivateRoute>
          <WatchPageTv />
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
    },

    { 
      path: "/mylist", 
      element: (
        <PrivateRoute>
          <MyList />
        </PrivateRoute>
      )
    },

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
