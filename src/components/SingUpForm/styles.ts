import styled from "styled-components";

export const Container = styled.div`
  background: var(--blue-light);

  padding: 0.4rem;

  margin-top: 5rem;

  form {
    background: #f8f8ff;

    height: 39rem;
    width: 32rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;

    #singUpImageDiv {
      justify-content: center;
      display: flex;

      img {
        width: 9rem;
      }
    }

    #singUpInputsDiv {
      display: flex;
      flex-direction: column;

      gap: 0.75rem;

      input {
        padding: 1rem 0.5rem;

        border: 1px solid #dcdcdc;
        border-radius: 0.25rem;
      }

      a {
        align-self: flex-end;
        text-decoration: none;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(1.4)
        }
      }
    }

    #singUpButtonsDiv {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      margin-top: 1.5rem;

      button {
        color: white;
        padding-top: 1rem;
        padding-bottom: 1rem;

        background: #6d3bcf;

        border-radius: 0.25rem;
        border: 0;

        transition: filter 0.2s;

        &:hover {
          filter: brightness(1.4)
        }
      }
    }
  }
`;
