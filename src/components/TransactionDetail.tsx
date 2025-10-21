import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types/wallet';
import { formatTransactionDate } from '../utils/dateUtils';

interface TransactionDetailProps {
  transaction: Transaction;
  onBack: () => void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ transaction, onBack }) => {
  const formatAmount = (amount: number, type: string) => {
    const formattedAmount = `$${amount.toFixed(2)}`;
    return type === 'Payment' ? `+${formattedAmount}` : formattedAmount;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="transaction-detail">
      <button className="back-button" onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      
      <div className="detail-header">
        <div className="detail-amount">
          {formatAmount(transaction.amount, transaction.type)}
        </div>
        <div className="detail-merchant">{transaction.name}</div>
        <div className="detail-date">
          {formatDate(transaction.date)}, {formatTime(transaction.date)}
        </div>
      </div>

      <div className="detail-card">
        <div className="detail-status">
          Status: {transaction.isPending ? 'Pending' : 'Approved'}
        </div>
        <div className="detail-payment-method">
          {transaction.type === 'Payment' ? 'Bank Transfer' : 'Credit Card'}
        </div>
        <div className="detail-divider"></div>
        <div className="detail-total">
          <span className="detail-total-label">Total</span>
          <span className="detail-total-amount">
            {formatAmount(transaction.amount, transaction.type)}
          </span>
        </div>
      </div>

      {transaction.location && (
        <div className="detail-card">
          <div className="detail-status">Location</div>
          <div className="detail-payment-method">{transaction.location}</div>
        </div>
      )}

      {transaction.description && transaction.type === 'Credit' && (
        <div className="detail-card">
          <div className="detail-status">Description</div>
          <div className="detail-payment-method">{transaction.description}</div>
        </div>
      )}

      {transaction.cashbackPercentage > 0 && (
        <div className="detail-card">
          <div className="detail-status">Cashback</div>
          <div className="detail-payment-method">{transaction.cashbackPercentage}% cashback earned</div>
        </div>
      )}

      {transaction.authorizedUser && (
        <div className="detail-card">
          <div className="detail-status">Authorized User</div>
          <div className="detail-payment-method">{transaction.authorizedUser}</div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
