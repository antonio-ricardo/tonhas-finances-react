import styled from "styled-components";

export const Container = styled.div` 
        
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    margin-left: 10rem;
    margin-right: 10rem;


    table {
        width: 100%;
        border-spacing: 0 0.5rem;

        th {
            color: var(--text-body);
            font-weight: 400;
            padding: 1rem 2rem;
            text-align: left;
            line-height: 1.5rem;
        }
    }
`;
