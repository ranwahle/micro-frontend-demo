import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css'
import React from "react";
import {appLoader, MicroApp} from "./MicroApp";



function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <MicroApp/>,
        },  {
            path: 'app/:appName/*',
            element: <MicroApp/>,
            loader: appLoader,
        }
    ], {
        basename: import.meta.env.VITE_BASE
    });

  return (
    <>
        <React.StrictMode>

            <RouterProvider router={router}
                            future={{ v7_startTransition: true }}
            />




        </React.StrictMode>
    </>
  )
}

export default App
