import styled from "styled-components";

export const StatusBullet = styled.div<{isFree: boolean}>`
width: 5rem;
height: 5rem;
border-radius: 50%;
background: ${props => props.isFree ? 'green' : 'red'};

`