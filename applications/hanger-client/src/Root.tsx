import { useEffect } from "react";
import { useLocation } from "react-router";

interface propsWithChildren { 
    children: React.ReactNode;
}

export function Root({children}: propsWithChildren) {
    const location = useLocation();
    useEffect(() => { 
        if (window.parent && window.parent !== window) {
            window.parent.postMessage({topic: 'location-changed', route: location.pathname}, '*');
        }
        
    }
    , [location]);
    return <>
    
        {children}
    </>
}