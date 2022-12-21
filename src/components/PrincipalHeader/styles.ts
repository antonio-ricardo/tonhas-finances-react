import styled, { css } from "styled-components";

export const Container = styled.header`
  background: var(--blue);
  height: 13.25rem;
`;

interface ContentProps {
  hasProfilePhoto: boolean;
}

export const Content = styled.div<ContentProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 10%;
  margin-right: 10%;
  padding-top: ${(props) => props.hasProfilePhoto ? '1.5rem' : '3rem'};

  div {
    color: #fff;
    align-items: center;
    display: flex;
    gap: 0.09rem;

    strong {
      width: 9rem;
    }
  }

  ${(props) => {
    if (props.hasProfilePhoto) {
      return css`
        #profileImgDiv {
          height: 6rem;

          img {
            width: 6rem;

            border-radius: 4rem;
            border: 2px solid var(--green);

            animation: appear 2s;
          }
        }
      `;
    }
  }}

  button {
    font-size: 1rem;
    color: #fff;
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

  @keyframes appear {
    from {
      opacity: 0;
    }
  }
`;
