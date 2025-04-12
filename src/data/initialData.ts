
export type Category = 
  | 'food'
  | 'transportation'
  | 'housing'
  | 'utilities'
  | 'entertainment'
  | 'healthcare'
  | 'shopping'
  | 'education'
  | 'travel'
  | 'salary'
  | 'investment'
  | 'gifts'
  | 'other';

export type TransactionType = 'expense' | 'income';

export interface Transaction {
  id: string;
  amount: number;
  category: Category;
  description: string;
  date: string;
  type: TransactionType;
}

export const categories: Record<Category, { name: string; color: string }> = {
  food: { name: 'Food & Dining', color: '#F59E0B' },
  transportation: { name: 'Transportation', color: '#3B82F6' },
  housing: { name: 'Housing', color: '#8B5CF6' },
  utilities: { name: 'Utilities', color: '#10B981' },
  entertainment: { name: 'Entertainment', color: '#EC4899' },
  healthcare: { name: 'Healthcare', color: '#14B8A6' },
  shopping: { name: 'Shopping', color: '#F43F5E' },
  education: { name: 'Education', color: '#6366F1' },
  travel: { name: 'Travel', color: '#0EA5E9' },
  salary: { name: 'Salary', color: '#22C55E' },
  investment: { name: 'Investment', color: '#A855F7' },
  gifts: { name: 'Gifts', color: '#F97316' },
  other: { name: 'Other', color: '#6B7280' }
};

export const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    category: 'salary',
    description: 'Monthly Salary',
    date: '2023-04-01',
    type: 'income'
  },
  {
    id: '2',
    amount: 500,
    category: 'housing',
    description: 'Rent Payment',
    date: '2023-04-02',
    type: 'expense'
  },
  {
    id: '3',
    amount: 85.50,
    category: 'food',
    description: 'Grocery Shopping',
    date: '2023-04-03',
    type: 'expense'
  },
  {
    id: '4',
    amount: 45,
    category: 'transportation',
    description: 'Gas',
    date: '2023-04-04',
    type: 'expense'
  },
  {
    id: '5',
    amount: 120,
    category: 'utilities',
    description: 'Electricity Bill',
    date: '2023-04-05',
    type: 'expense'
  },
  {
    id: '6',
    amount: 35,
    category: 'entertainment',
    description: 'Movie Tickets',
    date: '2023-04-06',
    type: 'expense'
  },
  {
    id: '7',
    amount: 200,
    category: 'investment',
    description: 'Stock Investment',
    date: '2023-04-07',
    type: 'income'
  },
  {
    id: '8',
    amount: 65,
    category: 'shopping',
    description: 'New Shirt',
    date: '2023-04-08',
    type: 'expense'
  }
];
