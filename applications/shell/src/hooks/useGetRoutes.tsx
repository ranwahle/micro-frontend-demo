import { useState } from "react";

export interface ApplicationData {
    label: string;
    url: string;
}

export function useGetRoutes() {
    const [routes, setRoutes] = useState<ApplicationData[]>([]);
    fetch('/shellserver/applications-list')
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        }).then((result) => { 
            result.forEach((app: ApplicationData) => {
                if (!app.url.endsWith('/')) {
                    app.url = `${app.url}/`;
                }
            });
            if (routes.length === 0) {
                setRoutes(result);
            }
        });
    return routes;
}
