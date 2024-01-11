import { useGetRoutes } from "../hooks/useGetRoutes.tsx";
import {StyledLink, StyledNav} from "./Navbar.styles.tsx";

export function Navbar() {
    const routes = useGetRoutes();
    return <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        {routes.map(item => <div key={item.url}>
            <StyledLink to={'/app' + item.url}>{item.label}</StyledLink>
            </div>)}
    </StyledNav>
}
