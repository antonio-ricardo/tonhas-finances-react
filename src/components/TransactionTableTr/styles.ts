import styled from "styled-components";

export const Container = styled.tr`
  td {
    padding: 1rem 2rem;
    border: 0;
    background: var(--shape);
    border-radius: 0.25rem;
    color: var(--text-body);

    &:first-child {
      color: var(--text-title);
    }

    &.DEPOSIT {
      color: var(--green);
    }

    &.WITHDRAW {
      color: var(--red);
    }
  }
`;
