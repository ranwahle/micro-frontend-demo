import './App.css'
import { createBrowserRouter, RouterProvider, useRouteError } from "react-router-dom";
import { ClothesInStock } from "./ClothesInStock";
import { useEffect } from "react";
import { Root } from './Root.tsx';
import { MachineStatus } from './MachineStatus/MachineStatus.tsx';
import { Status } from './widgets/Status.tsx';
import { ClothsInStockWidget } from './widgets/ClothsInStockWidget.tsx';

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

        const handleOnBeforeUnload = () => {
            if (window.parent && window.parent !== window) {
                window.parent.history.back();
                return undefined;
            }
         }

        window.addEventListener('message', handleMessage);
        window.addEventListener('beforeunload', handleOnBeforeUnload);
        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('beforeunload', handleOnBeforeUnload);

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
