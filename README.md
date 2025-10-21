# Wallet App

A React.js and TypeScript mobile wallet application with transaction management and daily points calculation.

## Features

- **TransactionsList Screen**: Displays card balance, payment status, daily points, and recent transactions
- **TransactionDetail Screen**: Shows detailed information for individual transactions
- **Daily Points System**: Calculates points based on season days with complex mathematical formula
- **Responsive Design**: Mobile-first design optimized for mobile devices
- **FontAwesome Icons**: Uses FontAwesome for transaction and UI icons

## Technical Stack

- React.js with TypeScript
- Vite for build tooling
- React Router for navigation
- FontAwesome for icons
- CSS3 for styling

## Project Structure

```
src/
├── components/
│   ├── TransactionItem.tsx    # Individual transaction list item
│   ├── TransactionsList.tsx   # Main transactions screen
│   └── TransactionDetail.tsx  # Transaction detail screen
├── data/
│   └── walletData.json        # Test data for transactions and card info
├── types/
│   └── wallet.ts              # TypeScript interfaces
├── utils/
│   ├── dateUtils.ts           # Date formatting utilities
│   └── pointsUtils.ts         # Daily points calculation logic
├── App.tsx                    # Main app component with routing
├── main.tsx                   # App entry point
└── index.css                  # Global styles
```

## Daily Points Calculation

The app implements a complex points system based on season days:

- **Day 1 of Season**: 2 points
- **Day 2 of Season**: 3 points
- **Day 3+ of Season**: 100% of day before previous + 60% of previous day
- Points are rounded and displayed in "K" format when >= 1000

## Transaction Features

- **Transaction Types**: Credit (expenses) and Payment (top-ups)
- **Date Display**: Shows day names for recent transactions, full dates for older ones
- **Pending Status**: Displays "Pending" prefix for pending transactions
- **Authorized Users**: Shows user names for transactions by authorized users
- **Cashback**: Displays cashback percentages for eligible transactions

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:

   ```bash
   npm run dev
   ```

3. Open your browser to the local development URL (usually http://localhost:5173)

## Screenshots

The application includes two main screens:

- **TransactionsList**: Card balance, payment status, daily points, and transaction list
- **TransactionDetail**: Detailed view of individual transactions with status, location, and other details

## Data Structure

The app uses JSON data stored in `src/data/walletData.json` containing:

- Card information (limit, balance, available credit, payment status)
- Transaction list with all required properties
- Mock data matching the UI requirements

## Mobile Optimization

The app is designed specifically for mobile devices with:

- Maximum width of 375px
- Touch-friendly interface
- Responsive card layouts
- Mobile-optimized typography and spacing
