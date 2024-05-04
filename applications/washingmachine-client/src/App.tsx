import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import './App.css';
import { ClothesInStock } from "./ClothesInStock";
import { MachineStatus } from './MachineStatus/MachineStatus.tsx';
import { Root } from './Root.tsx';
import { ClothsInStockWidget } from './widgets/ClothsInStockWidget.tsx';
import { Status } from './widgets/Status.tsx';

function ErrorBoundary() {
    const error = useRouteError() as { message: string };
    console.error(error);
    return <div>{error.message}</div>;
}
function App() {

    useEffect(() => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({ topic: 'loaded', app: import.meta.env.base }, '*');
        }
        const handleMessage = (message: unknown) => {
            const { data } = message as { data: { topic: string, route: string } };
            if (data.topic === 'set-inner-route') {
                console.log({ data })
                window.history.replaceState(null, '', `${import.meta.env.VITE_BASE}${data.route}/`
                    .replace('//', '/'))
            }
        }
        const handlePopState = (state: PopStateEvent) => {
            console.log({ state }, 'washingmachine');
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({topic: 'location-changed', route: location.pathname}, '*');
            }
        }
        const handleUnload = () => {
            if (window.parent && window.parent !== window) {
                window.parent.postMessage({ topic: 'unloaded', app: import.meta.env.VITE_BASE }, '*');
            }
        }
        window.addEventListener('unload', handleUnload);
        window.addEventListener('popstate', handlePopState);
        window.addEventListener('message', handleMessage);
        
        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('unload', handleUnload);
            

        }

       
    })
    const baseName = document.head.querySelector('base')?.getAttribute('href') || import.meta.env.VITE_BASE;
    const router = createBrowserRouter([


        {
            path: "/",
            element: <Root><MachineStatus /></Root>

        },
        { path: '/widgets/status/', element: <Status /> }
        , {
            path: '/cloths-in-stock',
            element: <Root><ClothesInStock /></Root>,
        }
        , {
            path: '/widgets/cloths-in-stock',
            element: <ClothsInStockWidget />,
        }

    ], {
        basename: baseName
    });
    return (
        <>




            {router.state.matches[0].route.path &&
                <RouterProvider router={router} fallbackElement={<ErrorBoundary />}
                    future={{ v7_startTransition: true }}
                />
            }
        </>

    )
}

export default App
