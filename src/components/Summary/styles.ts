import styled from "styled-components";

export const Container = styled.div`
  @media (max-width: 990px) {
    display: flex;
    flex-direction: column;
    min-width: 33rem;
  }

  @media (max-width: 580px) {
    min-width: 29rem;
  }

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  position: relative;
  top: -4rem;

  margin-left: 10%;
  margin-right: 10%;

  div {
    background: var(--shape);

    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    color: black;

    padding-left: 2rem;
    padding-right: 1.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    border-radius: 0.25rem;
    color: var(--text-title);

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    strong {
      font-size: 2rem;
      font-weight: 500;
    }

    &.total {
      background: var(--green);
      color: #fff;
    }

    &.negativeTotal {
      background: var(--red);
      color: #fff;
    }
  }
`;
