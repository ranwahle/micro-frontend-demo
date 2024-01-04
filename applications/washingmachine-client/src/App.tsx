import './App.css'
import {useGetStatus} from "./hooks/useGetStatus.tsx";
import {createBrowserRouter, RouterProvider, useRouteError} from "react-router-dom";

function ErrorBoundary() {
    const error = useRouteError() as {message: string};
    console.error(error);
    return <div>{error.message}</div>;
}
function App() {

    const router = createBrowserRouter([
        {
            path: "",
            element: <h1 key="default">Welcome to your washing machine</h1>,
        },

    ], {
         basename: import.meta.env.VITE_BASE
    });
    const status = useGetStatus();
  return (
    <>
<h1>Washing machine</h1>
        {status === 'loading' && <div>Loading...</div>}
        {status}
        {router.state.matches[0].route.path &&
        <RouterProvider router={router}  fallbackElement={<ErrorBoundary />} />
        }
    </>

  )
}

export default App
