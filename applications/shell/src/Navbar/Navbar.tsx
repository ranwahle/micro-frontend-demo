import {StyledLink, StyledNav} from "./Navbar.styles.tsx";


const menuItems = [
    {
        label: 'Home',
        path: '/',
    },
    {
        label: 'Washing macine Status',
        path: '/app/washingmachine',
    },
    {
        label: 'Clothes In Stock',
        path: '/app/washingmachine/clothes-In-Stock',
    },
    {
        label: 'Clothes On hanger',
        path: '/app/hanger',
    },
]

export function Navbar() {
    return <StyledNav>
        {menuItems.map(item => <div key={item.path}>
            <StyledLink to={item.path}>{item.label}</StyledLink>
            </div>)}
    </StyledNav>
}
