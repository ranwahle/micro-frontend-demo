import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { StyledFrame } from "./Microapp.styles.tsx";
import { AppData } from "./RouteLoader.ts";

function getHref(appName: string): string {
    const appIndex = location.pathname.indexOf(appName);
    return location.pathname.slice(0, appIndex + appName.length) + '/';
}

export function MicroApp() {
    const appData = useLoaderData() as AppData;
   

    useEffect(() => {
        const { appName } = appData;
        const handleMessage = (message: MessageEvent) => {
           
            if (message.data.topic === 'loaded') {
                const iframe = document.querySelector<HTMLIFrameElement>('iframe');
                if (iframe) {
                    iframe.style.visibility = 'visible';
        
                }

            } if (message.data.topic === 'location-changed') {
                const newUrl = (getHref(appName) + message.data.route).replace('//', '/');
                const currentUrl = window.location.pathname;
                if (currentUrl !== newUrl) {
                    history.replaceState(history.state, '', newUrl);
                }
            }
        }
        const popstateHandler = (state: unknown) => console.log({state})
            window.addEventListener('popstate', popstateHandler);
   

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
            window.removeEventListener('popstate', popstateHandler);

        }
    });

   
    useEffect(() => {

        if (appData) {

            const { appName } = appData;
            const appIndex = location.pathname.indexOf(appName);
            const newSource = `${location.pathname.slice(appIndex)}/`.replace('//', '/');
            const iframe = document.querySelector<HTMLIFrameElement>('iframe');
            if (iframe) { 
                iframe.src = `/${newSource}`;
            }


        }

    }, [appData])
    return (<>


        <StyledFrame scrolling="no" id={appData?.appName}></StyledFrame>

    </>);


}



