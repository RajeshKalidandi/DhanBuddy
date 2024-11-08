import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface Stats {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpense: number;
  monthlySavings: number;
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpense: 0,
    monthlySavings: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/transactions/stats/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const stats_data = [
    {
      title: 'Total Balance',
      amount: stats.totalBalance,
      icon: Wallet,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Monthly Income',
      amount: stats.monthlyIncome,
      icon: TrendingUp,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Monthly Expense',
      amount: stats.monthlyExpense,
      icon: TrendingDown,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'Monthly Savings',
      amount: stats.monthlySavings,
      icon: PiggyBank,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats_data.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold">{formatCurrency(stat.amount)}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}