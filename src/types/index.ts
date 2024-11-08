export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  monthly_income: number;
  profile_picture?: string;
}

export interface Transaction {
  id: number;
  category: number;
  amount: number;
  description: string;
  date: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  type: 'INCOME' | 'EXPENSE';
  icon: string;
  color: string;
}

export interface SavingsGoal {
  id: number;
  title: string;
  target_amount: number;
  current_amount: number;
  start_date: string;
  target_date: string;
  status: 'ONGOING' | 'COMPLETED' | 'FAILED';
}

export interface AuthResponse {
  access: string;
  refresh: string;
} 