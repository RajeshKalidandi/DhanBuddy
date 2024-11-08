import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import StatsBar from './StatsBar';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';
import { useAuth } from '../../hooks/useAuth.tsx';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Welcome back, {user?.first_name}!
        </h1>
        
        <StatsBar />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ExpenseChart />
          <TransactionList />
        </div>
      </main>
    </div>
  );
} 