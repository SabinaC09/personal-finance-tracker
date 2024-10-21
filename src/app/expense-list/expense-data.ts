import { Expense } from './expense.model';

export const DUMMY_EXPENSES: Expense[] = [
  { id: 1, description: 'Groceries', amount: 150, date: '2024-10-01', category: 'Food' },
  { id: 2, description: 'Electricity Bill', amount: 75, date: '2024-10-05', category: 'Utilities' },
  { id: 3, description: 'Internet Bill', amount: 50, date: '2024-10-07', category: 'Utilities' },
  { id: 4, description: 'Movie Tickets', amount: 30, date: '2024-10-10', category: 'Entertainment' },
  { id: 5, description: 'Coffee with Friends', amount: 25, date: '2024-10-15', category: 'Leisure' }
];
