import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";

ReactModal.setAppElement('#root')

export function App() {

  const [isNewTransactionModalIsOpen, setIsNewTransactionModalIsOpen] = useState<boolean>(false)


  function handleOpenNewTransactionModal() {
    setIsNewTransactionModalIsOpen(true)
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransactionModalIsOpen(false)
  }

  return (
    <TransactionsProvider>

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        handleCloseNewTransactionModal={handleCloseNewTransactionModal}
        isNewTransactionModalIsOpen={isNewTransactionModalIsOpen}
      />

      <GlobalStyle />

    </TransactionsProvider>
  );
}
