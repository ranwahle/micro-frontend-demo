import { useLoaderData, useLocation } from "react-router-dom";
import { StyledFrame } from "./Microapp.styles.tsx";
import { useEffect, useState } from "react";
import { AppData } from "./RouteLoader.ts";

export function MicroApp() {
    const appData = useLoaderData() as AppData;
    const [appHTML, setAppHTML] = useState('');
    function getHref(appName: string): string {
        const appIndex = location.pathname.indexOf(appName);
        return location.pathname.slice(0, appIndex + appName.length) + '/';
    }

    useEffect(() => {
        const { appName } = appData;
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
            } if (message.data.topic === 'location-changed') {
                const newUrl = (getHref(appName) + message.data.route).replace('//', '/');
                const currentUrl = window.location.pathname;
                if (currentUrl !== newUrl) {
                    window.history.pushState(history.state, '', newUrl);
                }

            }
        }

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        }
    });

    useEffect(() => {
        const { appName } = appData;
        function loadFrameContent(iframe: HTMLIFrameElement | null) {
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
        if (appHTML) {
            const iframe = document.querySelector<HTMLIFrameElement>('iframe');
            loadFrameContent(iframe);
        }
    }, [appHTML, appData]);

    useEffect(() => {

        if (appData) {

            const { appName } = appData;
            const appIndex = location.pathname.indexOf(appName);
            const newSource = `${location.pathname.slice(appIndex)}/`.replace('//', '/');
            fetch(`http://localhost/${newSource}`).then((response) => response.text()).then((html: string) => {
                console.log({ html }, { newSource });
                setAppHTML('');
                setTimeout(() => setAppHTML(html));
            });


        }

    }, [appData])
    return (<>


        {appHTML && <StyledFrame scrolling="no" id={appData?.appName}></StyledFrame>}

    </>);


}



