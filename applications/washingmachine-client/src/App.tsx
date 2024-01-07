import './App.css'
import {createBrowserRouter, RouterProvider, useRouteError} from "react-router-dom";
import {ClothsInStock} from "./ClothesInStock";
import {useEffect} from "react";
import { Root } from './Root.tsx';
import { MachineStatus } from './MachineStatus/MachineStatus.tsx';

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
    const baseName = document.head.querySelector('base')?.getAttribute('href') || import.meta.env.VITE_BASE;
    console.log({ baseName });
    const router = createBrowserRouter([
       
        {
            path: "/",
            element: <Root>
                 <MachineStatus/>
                </Root>,
        },{
        path: '/cloths-in-stock',
            element: <Root><ClothsInStock/></Root>,
        }

    ], {
            basename: baseName
    });
  return (
    <>
<h1>Washing machine</h1>

        
       
        {router.state.matches[0].route.path &&
              <RouterProvider router={router} fallbackElement={<ErrorBoundary />}
                  future={{ v7_startTransition: true }}
         />
        }
    </>

  )
}

export default App
