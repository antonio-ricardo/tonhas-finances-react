import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  margin-left: 10%;
  margin-right: 10%;

  input {
    @media (max-width: 870px) {
      min-width: 23rem;
    }

    width: 90rem;
    
    min-width: 27rem;
    padding: 1rem 1rem;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    border-radius: 0.25rem;
    border: 0;
    background: var(--blue-light);
    color: white;
    font-weight: 500;

    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    padding-right: 2rem;
    padding-left: 1rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
