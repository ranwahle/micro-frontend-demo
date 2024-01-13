import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css'
import {useEffect} from "react";
import { Home } from './home/Home.tsx';
import { ClothesOnHanger } from './widgets/ClothsOnHanger.tsx';
import { Root } from './Root.tsx';







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

    const basename = document.head.querySelector('base')?.getAttribute('href') || import.meta.env.VITE_BASE;

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Root><Home /></Root>
        },
        {
            path: 'widgets/clothes-on-hanger/',
            element: <ClothesOnHanger/>
        }
    ], {basename})
   ;
  
  return (
   <>
    {router.state.matches[0].route.path &&
        <RouterProvider router={router} 
            future={{ v7_startTransition: true }}
   />
          }
          </>

  )
}

export default App
