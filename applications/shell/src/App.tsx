import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css'
import React from "react";
import {appLoader, MicroApp} from "./MicroApp";
import { Layout } from "./layout";



function App() {

    const router = createBrowserRouter([
        {
            path: "*",
            element: <Layout><></></Layout>,
          
        },
        {
            path: "/",
            element: <Layout><></></Layout>,
          
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
