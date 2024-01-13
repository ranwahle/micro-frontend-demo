import styled from "styled-components";

export const WidgetsContainer = styled.div`
display: flex;
flex-wrap: wrap;
`;

export const WidgetContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #cccccc;
    iframe {
        border-style: none;
    }
`;