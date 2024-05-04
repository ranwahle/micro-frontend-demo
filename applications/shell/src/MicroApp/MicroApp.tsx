import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { StyledFrame } from "./Microapp.styles.tsx";
import { AppData } from "./RouteLoader.ts";

function loadFrameContent(iframe: HTMLIFrameElement | null, appName: string, appHTML: string) {
    if (iframe) {
        iframe.style.visibility = 'hidden';
        requestAnimationFrame(() => {
            const doc = document.implementation.createHTMLDocument();
            doc.documentElement.innerHTML = appHTML;
            const base = doc.createElement('base');
            base.href = getHref(appName);
            doc.head.insertBefore(base, doc.head.firstElementChild);
            if (iframe.contentDocument && iframe.contentWindow) {
                iframe.contentDocument.open();
                iframe.contentDocument.write(doc.documentElement.innerHTML);
                iframe.contentDocument.close();
            }
        });

    }
}

function getHref(appName: string): string {
    const appIndex = location.pathname.indexOf(appName);
    return location.pathname.slice(0, appIndex + appName.length) + '/';
}

export function MicroApp() {
    const appData = useLoaderData() as AppData;
    const [appHTML] = useState('');
   

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
        const { appName } = appData;
        
        if (appHTML) {
            const iframe = document.querySelector<HTMLIFrameElement>('iframe');
            loadFrameContent(iframe, appName, appHTML);
        }
    }, [appHTML, appData]);

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



