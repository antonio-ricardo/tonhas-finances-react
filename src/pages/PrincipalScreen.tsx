import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from "../components/Dashboard";
import { PrincipalHeader } from "../components/PrincipalHeader";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { TransactionsProvider } from "../hooks/useTransactions";
import { AuthenticateProvider } from "../hooks/useAuthenticate";

ReactModal.setAppElement('#root')

export function PrincipalScreen() {

  const [isNewTransactionModalIsOpen, setIsNewTransactionModalIsOpen] = useState<boolean>(false)


  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalIsOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalIsOpen(false)
  }

  return (
    <>
      <AuthenticateProvider>
        <TransactionsProvider>
          <PrincipalHeader onOpenNewTransactionModal={handleOpenNewTransactionModal} />

          <Dashboard />

          <NewTransactionModal
            handleCloseNewTransactionModal={handleCloseNewTransactionModal}
            isNewTransactionModalIsOpen={isNewTransactionModalIsOpen}
          />
        </TransactionsProvider>
      </AuthenticateProvider>
    </>
  );
}
