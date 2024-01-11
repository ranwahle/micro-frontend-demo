import { useGetRoutes } from "../hooks/useGetRoutes.tsx";
import {StyledLink, StyledNav} from "./Navbar.styles.tsx";


// const menuItems = [
//     {
//         label: 'Home',
//         path: '/',
//     },
//     {
//         label: 'Washing macine Status',
//         path: '/app/washingmachine',
//     },
//     {
//         label: 'Clothes In Stock',
//         path: '/app/washingmachine/clothes-In-Stock',
//     },
//     {
//         label: 'Clothes On hanger',
//         path: '/app/hanger',
//     },
// ]

export function Navbar() {
    const routes = useGetRoutes();
    console.log(routes);
    return <StyledNav>
        <StyledLink to="/">Home</StyledLink>
        {routes.map(item => <div key={item.url}>
            <StyledLink to={'/app' + item.url}>{item.label}</StyledLink>
            </div>)}
    </StyledNav>
}
