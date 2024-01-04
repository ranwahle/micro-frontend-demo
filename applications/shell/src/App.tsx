import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.css'
import React from "react";
import {appLoader, MicroApp} from "./MicroApp";

const shellRoute = {
    path: 'app/:appName',
    element: <MicroApp/>,
    loader: appLoader
}

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <><h1>H1</h1></>,
        }, shellRoute
    ], {
        basename: import.meta.env.VITE_BASE
    });

  return (
    <>
        <React.StrictMode>
            base: {import.meta.env.VITE_BASE}
            <RouterProvider router={router} />
        </React.StrictMode>
    </>
  )
}

export default App
