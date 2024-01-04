import {Params, useLoaderData} from "react-router-dom";
import {FrameContainer, StyledFrame} from "./Microapp.styles.tsx";
import {useGetRoutes} from "../hooks/useGetRoutes.tsx";
import {useState} from "react";


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
        const {appName} = appData;
        const appRoute = apps.find((app) => app.name.toLowerCase() === appName.toLowerCase());
        if (appRoute) {
            setAppUrl(appRoute.url);
        } else {
            console.error('no route found', {appName, apps});
        }
    } );
    console.log({appData});
    return (<FrameContainer >
        <StyledFrame scrolling="no" src={appUrl} id={appData?.appName}></StyledFrame>
    </FrameContainer>);
}