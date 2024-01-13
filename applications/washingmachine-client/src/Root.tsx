import { useEffect } from "react";
import { useLocation } from "react-router";
import { StyledLink } from "./Root.styles";

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
        <h1>Washing machine</h1>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/cloths-in-stock">Clothes in bucket</StyledLink>
        {children}
    </>
}