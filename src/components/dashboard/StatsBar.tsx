import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

interface Stats {
  total_balance: number;
  monthly_income: number;
  monthly_expense: number;
  monthly_savings: number;
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    total_balance: 0,
    monthly_income: 0,
    monthly_expense: 0,
    monthly_savings: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions/stats/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      // Ensure we have valid numbers
      const data = {
        total_balance: Number(response.data.total_balance) || 0,
        monthly_income: Number(response.data.monthly_income) || 0,
        monthly_expense: Number(response.data.monthly_expense) || 0,
        monthly_savings: Number(response.data.monthly_savings) || 0
      };
      
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
      setError('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 rounded-xl p-4">
        <p className="text-red-600 text-center">{error}</p>
      </div>
    );
  }

  const statItems = [
    {
      title: 'Total Balance',
      value: stats.total_balance,
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Monthly Income',
      value: stats.monthly_income,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Monthly Expense',
      value: stats.monthly_expense,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Monthly Savings',
      value: stats.monthly_savings,
      icon: PiggyBank,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-500">{item.title}</span>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
          </div>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(item.value)}
            </span>
            {item.title !== 'Total Balance' && (
              <span className="ml-2 text-sm text-gray-500">this month</span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}