import { Params } from "react-router-dom";

export interface RouteParams {
    params: Params<string>;
}

export interface AppData {
    appName: string;
}

export async function appLoader({ params }: RouteParams): Promise<AppData> {
    if (!params.appName) throw new Error('appName is required');
    return { appName: params.appName };
}
