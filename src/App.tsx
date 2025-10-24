import React, { useState } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import TransactionDetail from './components/TransactionDetail';
import TransactionsList from './components/TransactionsList';
import walletData from './data/walletData.json';
import type { Transaction, WalletData } from './types/wallet';

const AppContent: React.FC = () => {
  const [data] = useState<WalletData>(walletData as WalletData);
  const [_, setSelectedTransaction] = useState<Transaction | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    navigate(`/transaction/${transaction.id}`);
  };

  const handleBack = () => {
    setSelectedTransaction(null);
    navigate('/');
  };

  // Show transaction detail if we're on a transaction route
  if (location.pathname.startsWith('/transaction/')) {
    const transactionId = parseInt(location.pathname.split('/')[2]);
    const transaction = data.transactions.find(t => t.id === transactionId);
    
    if (transaction) {
      return <TransactionDetail transaction={transaction} onBack={handleBack} />;
    }
  }

  return (
    <TransactionsList
      cardInfo={data.cardInfo}
      transactions={data.transactions}
      onTransactionClick={handleTransactionClick}
    />
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;