import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  #closeModalButton {
    background: var(--shape);

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 0;

    border: 0;
    margin-top: 1.5rem;
    margin-right: 1.5rem;

    img {
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.5);
      }
    }
  }

  form {
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 2rem;

    h1 {
      font-weight: 700;
      margin-bottom: 2rem;
    }

    div {
      display: flex;
    }

    #modalTextInputsContainer {
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 1.5rem;

      input {
        background-color: #f0f2f5;
        padding: 1rem;
        border: 0;
        border-radius: 0.25rem;

        &::placeholder {
          color: var(--text-body);
        }
      }
    }

    #modalButtonsContainer {
      gap: 1rem;

      margin-bottom: 2.5rem;
      justify-content: space-between;

      button {
        background-color: white;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        border: 0.16rem solid #f0f2f5;
        border-radius: 0.25rem;
        padding: 1rem 1.5rem;
        width: 100%;
      }

      
      .markedDepositButton {
        background-color: var(--green);
      }

      .markedWithdrawButton {
        background-color: var(--red);
      }
    }

    button {
      transition: filter 0.2s;

      &:hover {
        filter: brightness(0.8);
      }
    }

    button[type="submit"] {
      background: var(--green);
      color: white;

      border: 0;
      border-radius: 0.25rem;

      width: 100%;
      height: 4rem;
      padding: 1rem 11.5rem;
    }
  }
`;
