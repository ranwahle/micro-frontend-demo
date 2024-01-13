import styled from "styled-components";
import {Link} from "react-router-dom";

export const StyledNav = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
   
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    color: #cccccc;
    white-space: nowrap;
    text-align: left;
    
`
