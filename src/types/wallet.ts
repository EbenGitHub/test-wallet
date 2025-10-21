export interface CardInfo {
  limit: number;
  balance: number;
  availableCredit: number;
  paymentDue: boolean;
  paymentMessage: string;
}

export interface Transaction {
  id: number;
  type: "Credit" | "Payment";
  amount: number;
  name: string;
  description: string;
  location: string;
  date: string;
  authorizedUser: string;
  isPending: boolean;
  cashbackPercentage: number;
  icon: string;
}

export interface WalletData {
  cardInfo: CardInfo;
  transactions: Transaction[];
}
