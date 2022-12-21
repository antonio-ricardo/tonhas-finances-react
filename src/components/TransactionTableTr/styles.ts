import styled, { css } from "styled-components";

function animationManyChildrens() {
  let styles = "";
  let backwardsSeconds = 0.1;
  const childrenQuantity = 10;

  for (let i = 1; i <= childrenQuantity; i += 1) {
    backwardsSeconds += 0.2;

    styles += `
      &:nth-child(${i}) {
        animation: fromRight 1s backwards ${backwardsSeconds}s 
      }
    `;
  }

  return css`
    ${styles}
  `;
}

export const Container = styled.tr`
  ${animationManyChildrens()}

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

  @keyframes fromRight {
    from {
      opacity: 0;
      transform: translateX(-10rem);
    }

    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
