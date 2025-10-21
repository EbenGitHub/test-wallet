import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import type { CardInfo, Transaction } from '../types/wallet';
import { calculateDailyPoints, formatPoints } from '../utils/pointsUtils';
import TransactionItem from './TransactionItem';

interface TransactionsListProps {
  cardInfo: CardInfo;
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
}

const TransactionsList: React.FC<TransactionsListProps> = ({
  cardInfo,
  transactions,
  onTransactionClick
}) => {
  const todayPoints = calculateDailyPoints(new Date());
  const formattedPoints = formatPoints(todayPoints);

  return (
    <div className="app">
      <div className="header">
        <h1>Wallet</h1>
      </div>
      
      <div className="summary-section">
        <div className="summary-column">
          <div className="card card-balance" style={{marginBottom: 10}}>
            <div className="card-balance-title">Card Balance</div>
            <div className="card-balance-amount">${cardInfo.balance.toFixed(2)}</div>
            <div className="card-balance-available">${cardInfo.availableCredit.toFixed(2)} Available</div>
          </div>
          <div className="card card-points">
            <div className="points-title">Daily Points</div>
            <div className="points-amount">{formattedPoints}</div>
          </div>
        </div>
        
        <div className="summary-row">
        <div className="card card-payment" style={{height: '100%'}}>
            <div className="payment-title">No Payment Due</div>
            <div className="payment-message">{cardInfo.paymentMessage}</div>
            <div className="checkmark-icon">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
          
        </div>
      </div>

      <div className="transactions-section">
        <h2 className="transactions-title">Latest Transactions</h2>
        <div className="transaction-list">
          {transactions.slice(0, 10).map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onClick={onTransactionClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionsList;
