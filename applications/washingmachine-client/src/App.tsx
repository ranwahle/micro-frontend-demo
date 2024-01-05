import './App.css'
import {useGetStatus} from "./hooks/useGetStatus.tsx";
import {createBrowserRouter, RouterProvider, useRouteError} from "react-router-dom";
import {ClothesInStock} from "./ClothesInStock";
import {useEffect} from "react";

function ErrorBoundary() {
    const error = useRouteError() as {message: string};
    console.error(error);
    return <div>{error.message}</div>;
}
function App() {

    useEffect(() => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({topic: 'loaded', app: import.meta.env.base}, '*');
        }
        const handleMessage = (message: unknown) => {
           const {data} = message as {data: {topic: string, route: string}};
              if (data.topic === 'set-inner-route') {
                  console.log({data})
                window.history.replaceState(null, '', `${import.meta.env.VITE_BASE}${data.route}/`
                    .replace('//', '/'))
              }
        }
        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    })
    const router = createBrowserRouter([
        {
            path: "",
            element: <h1 key="default">Welcome to your washing machine</h1>,
        },{
        path: 'clothes-in-stock',
            element: <ClothesInStock/>
        }

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
