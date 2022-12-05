import styled from "styled-components";

export const Container = styled.header`
    background: var(--blue);
    height: 13.25rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;

  margin-left: 10rem;
  margin-right: 10rem;
  padding-top: 2.5rem;

  div {
    color: #fff;
    align-items: center;
    display: flex;
    gap: 0.09rem;

    strong {
      width: 9rem;
    }
  }

  button {
    font-size: 1rem;
    color: #FFF;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.25rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.9);
    }
  }
`;
