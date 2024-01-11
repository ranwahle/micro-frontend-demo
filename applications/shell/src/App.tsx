import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css'
import React from "react";
import { MicroApp} from "./MicroApp";
import { Layout } from "./layout";
import { appLoader } from "./MicroApp/RouteLoader";
import { Homepage } from "./Homepage";



function App() {

    const router = createBrowserRouter([
        {
            path: "*",
            element: <Layout><></></Layout>,
          
        },
        {
            path: "/",
            element: <Layout><Homepage/></Layout>,
          
        },  {
            path: 'app/:appName/*',
            element: <Layout><MicroApp/></Layout>,
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
