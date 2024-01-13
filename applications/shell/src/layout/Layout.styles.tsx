import styled from "styled-components";

export const FrameContainer = styled.div`
    height: 100vh;
    min-width: 100vh;
    overflow: hidden;
    border: none;
    display: flex;
    gap: 0.5rem;
    main {
        flex-grow: 1;
        gap: 0;
    }
`;