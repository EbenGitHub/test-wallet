import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBank, faHome, faBullseye, faCoffee, faShoppingCart, faGasPump, faMobile, faStore } from '@fortawesome/free-solid-svg-icons';
import type { Transaction } from '../types/wallet';
import { formatTransactionDate } from '../utils/dateUtils';

interface TransactionItemProps {
  transaction: Transaction;
  onClick: (transaction: Transaction) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'apple':
      return faMobile; // Using mobile icon for Apple
    case 'bank':
      return faBank;
    case 'ikea':
      return faHome;
    case 'target':
      return faBullseye;
    case 'coffee':
      return faCoffee;
    case 'amazon':
      return faShoppingCart;
    case 'gas':
      return faGasPump;
    default:
      return faStore; // Using store icon as default
  }
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onClick }) => {
  const handleClick = () => {
    onClick(transaction);
  };

  const formatAmount = (amount: number, type: string) => {
    const formattedAmount = `$${amount.toFixed(2)}`;
    return type === 'Payment' ? `+${formattedAmount}` : formattedAmount;
  };

  const formatDescription = () => {
    let description = transaction.description;
    if (transaction.isPending) {
      description = `Pending - ${description}`;
    }
    if (transaction.authorizedUser) {
      description += ` - ${transaction.authorizedUser}`;
    }
    return description;
  };

  return (
    <div className="transaction-item" onClick={handleClick}>
      <div className={`transaction-icon ${transaction.icon}`}>
        <FontAwesomeIcon icon={getIcon(transaction.icon)} />
      </div>
      <div className="transaction-details">
        <div className="transaction-name">{transaction.name}</div>
        <div className="transaction-description">{formatDescription()}</div>
        <div className="transaction-date">{formatTransactionDate(transaction.date)}</div>
      </div>
      <div className="transaction-amount-section">
        <div className={`transaction-amount ${transaction.type.toLowerCase()}`}>
          {formatAmount(transaction.amount, transaction.type)}
        </div>
        {transaction.cashbackPercentage > 0 && (
          <div className="transaction-cashback">{transaction.cashbackPercentage}%</div>
        )}
        <div className="transaction-arrow">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
