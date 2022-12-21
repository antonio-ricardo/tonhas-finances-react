import styled from "styled-components";

export const Container = styled.header`
  background: var(--blue);
  height: 13.25rem;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-left: 10%;
  margin-right: 10%;
  padding-top: 1.5rem;

  div {
    color: #fff;
    align-items: center;
    display: flex;
    gap: 0.09rem;

    strong {
      width: 9rem;
    }
  }

  #profileImgDiv {
    height: 6rem;
    
    img {
      width: 6rem;

      border-radius: 4rem;
      border: 2px solid var(--green);

      animation: appear 1s;
    }
  }

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
      width: 1rem;
    }
  }
`;
