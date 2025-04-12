
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Transaction, initialTransactions } from '../data/initialData';
import { toast } from '@/components/ui/use-toast';

// Define the state type
type TransactionState = {
  transactions: Transaction[];
};

// Define the action types
type TransactionAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'EDIT_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }; // id of the transaction to delete

// Define the context type
type TransactionContextType = {
  state: TransactionState;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
};

// Create the context
const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Create a reducer function
function transactionReducer(state: TransactionState, action: TransactionAction): TransactionState {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
      };
    default:
      return state;
  }
}

// Create a provider component
export const TransactionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, {
    transactions: initialTransactions,
  });

  // Add a transaction
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    // Generate a unique ID
    const newTransaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    
    dispatch({ type: 'ADD_TRANSACTION', payload: newTransaction });
    toast({
      title: "Transaction added",
      description: `${transaction.type === 'expense' ? 'Expense' : 'Income'} of $${transaction.amount} added.`,
    });
  };

  // Edit a transaction
  const editTransaction = (transaction: Transaction) => {
    dispatch({ type: 'EDIT_TRANSACTION', payload: transaction });
    toast({
      title: "Transaction updated",
      description: `${transaction.type === 'expense' ? 'Expense' : 'Income'} has been updated.`,
    });
  };

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
    toast({
      title: "Transaction deleted",
      description: "The transaction has been removed.",
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        state,
        addTransaction,
        editTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Create a custom hook to use the transaction context
export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
