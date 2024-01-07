import styled from 'styled-components';

export const StatusBullet = styled.div<{isFree: boolean}>`
width: 5rem;
height: 5rem;
margin-top: 28px;
border-radius: 50%;
position: absolute;
background: ${props => props.isFree ? 'green' : 'red'};

`

export const MachineImage = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`