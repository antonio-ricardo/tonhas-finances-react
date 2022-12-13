import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  justify-content: center;

  position: relative;
  top: -4rem;

  margin-left: 10rem;
  margin-right: 10rem;

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
