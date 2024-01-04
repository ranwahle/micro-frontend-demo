export interface ApplicationData {
    name: string;
    url: string;
}

export async function useGetRoutes() {
    const response = await fetch('/shellserver/applications-list')
    const result =  await response.json() as ApplicationData[];
    result.forEach((app) => {
        if (!app.url.endsWith('/')) {
            app.url = `${app.url}/`;
        }
    });
    return result;
}
