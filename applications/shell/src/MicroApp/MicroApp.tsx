import { useLoaderData } from "react-router-dom";
import { StyledFrame } from "./Microapp.styles.tsx";
import { useEffect, useState } from "react";
import { AppData } from "./RouteLoader.ts";

export function MicroApp() {
    const appData = useLoaderData() as AppData;
    const [appHTML, setAppHTML] = useState('');
    const [frameSource, setFrameSource] = useState('');
    function getHref(): string {
        const { appName } = appData;
        const appIndex = location.pathname.indexOf(appName);
        return location.pathname.slice(0, appIndex + appName.length) + '/';
    }
    
    useEffect(() => { 

        const handleMessage = (message: MessageEvent) => { 
            if (message.data.topic === 'loaded') {
                const source = message.source as Window;
                const iframe = document.querySelector<HTMLIFrameElement>('iframe');
                if (iframe) {
                    iframe.style.visibility = 'visible';
                }
                    source.addEventListener('popstate', (state) => {
                    console.log({ state });
                 });
                console.log('loaded', message.data.app);
            } if (message.data.topic === 'location-changed') {
                console.log('location-changed', message.data.route);
                const newUrl = (getHref() + message.data.route).replace('//', '/');
                console.log({ newUrl });
                setTimeout(() => {
                    window.history.replaceState(null, '', newUrl);
                });

            }
        }

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        }
    });

    useEffect(() => {
        if (appHTML) {
            const iframe = document.querySelector<HTMLIFrameElement>('iframe');
            loadFrameContent(iframe);
        }
    }, [appHTML, frameSource]);

    useEffect(() => {

        if (appData) {

            const { appName } = appData;
            const appIndex = location.pathname.indexOf(appName);
            const newSource = `${location.pathname.slice(appIndex)}/`.replace('//', '/');
            fetch(`http://localhost/${newSource}`).then((response) => response.text()).then((html: string) => {
                console.log({ html }, { newSource })
                setFrameSource(`http://localhost/${newSource}`);
                setAppHTML('');
                setTimeout(() => setAppHTML(html));
            });


        }

    }, [appData])
    return (<>


        {appHTML && <StyledFrame scrolling="no" id={appData?.appName}></StyledFrame>}

    </>);

    function loadFrameContent(iframe: HTMLIFrameElement | null) {
        if (iframe) {
            iframe.style.visibility = 'hidden';
            requestAnimationFrame(() => {
                const doc = document.implementation.createHTMLDocument();
                doc.documentElement.innerHTML = appHTML;
                const base = doc.createElement('base');
                base.href = getHref();
                doc.head.insertBefore(base, doc.head.firstElementChild);
                if (iframe.contentDocument && iframe.contentWindow) {
                    iframe.contentDocument.open();
                    iframe.contentDocument.write(doc.documentElement.innerHTML);
                    iframe.contentDocument.close();
                }
            });

        }
    }
}



