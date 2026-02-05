import { useEffect } from 'react';
import Browse from './Browse';
import Login from './Login';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';

// ✅ Import actions
import { addUser, removeUser } from '../utils/userSlice';

const Body = () => {

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/browse",
            element: <Browse />,
        }
    ]);

    useEffect(() => {

        // ✅ Store unsubscribe function
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;

                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL
                    })
                );
            } else {
                dispatch(removeUser());
            }
        });

        // ✅ Cleanup listener
        return () => unsubscribe();

    }, [dispatch]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
}

export default Body;
