import {Params, useLoaderData} from "react-router-dom";
import {FrameContainer, StyledFrame} from "./Microapp.styles.tsx";
import {useGetRoutes} from "../hooks/useGetRoutes.tsx";
import {useEffect, useState} from "react";
import {Navbar} from "../Navbar/Navbar.tsx";


const AppNameToUrl: Record<string, string> = {
    washingmachine: '/washingmachine/',

}

interface RouteParams {
    params: Params<string>;
}

interface AppData {
    appName: string;
    appUrl: string;
}
export async function appLoader({ params  }: RouteParams): Promise<AppData> {
    if (!params.appName) throw new Error('appName is required');
    return {appName: params.appName, appUrl: AppNameToUrl[params.appName.toLowerCase()] || ''};
}

export function MicroApp() {
    const microApps = useGetRoutes();
    const appData = useLoaderData() as AppData;
    const [appUrl, setAppUrl] = useState('')
    microApps.then((apps) => {
        if (!appData) {
            console.error('no app data');
            return;
        }
        const {appName} = appData;
        const appRoute = apps.find((app) => app.name.toLowerCase() === appName.toLowerCase());
        if (appRoute) {
            setAppUrl(appRoute.url);
        } else {
            console.error('no route found', {appName, apps});
        }
    } );

    function getRoute() {
        const {appName} = appData;
       const appIndex = location.pathname.indexOf(appName);
       if (appIndex === -1) {
           return '/';
       }
         return location.pathname.slice(appIndex + appName.length);
    }

    useEffect(() => {
        const handleMessage = (message: unknown) => {
            const messageEvent = message as {
                data: { topic: string, app: string }
                , source: Window
            };
            if (messageEvent.data.topic === 'loaded') {
                messageEvent.source.postMessage({ topic: 'set-inner-route', route: getRoute() }, '*')
            }
        }

        window.addEventListener('message', handleMessage);
        const iframe = document.querySelector('iframe');
       
        if (iframe && appData) {
           
            const { appName } = appData;
            const appIndex = location.pathname.indexOf(appName);
            const newSource = location.pathname.slice(appIndex);
            iframe.src = `/${newSource}/`.replace('//', '/');
            
        }
        return () => {
            window.removeEventListener('message', handleMessage);
        }
    })
    return (<>
        <FrameContainer >
            <Navbar></Navbar>
           
                <StyledFrame scrolling="no" src={appUrl} id={appData?.appName}></StyledFrame>
            
    </FrameContainer>
    </>);
}
