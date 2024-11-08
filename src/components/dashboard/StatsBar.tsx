import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useState, useEffect } from 'react';
import { transactionService } from '../../services/api';

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await transactionService.getTransactions();
        // Calculate stats from transactions
        // This is a simplified version - you might want to add more complex calculations
        const transactions = response.data;
        const income = transactions
          .filter((t: any) => t.category.type === 'INCOME')
          .reduce((sum: number, t: any) => sum + t.amount, 0);
        const expense = transactions
          .filter((t: any) => t.category.type === 'EXPENSE')
          .reduce((sum: number, t: any) => sum + t.amount, 0);
        
        setStats({
          totalBalance: income - expense,
          monthlyIncome: income,
          monthlyExpense: expense,
          monthlySavings: income - expense,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats_items = [
    {
      title: 'Total Balance',
      value: stats.totalBalance,
      icon: Wallet,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Monthly Income',
      value: stats.monthlyIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Monthly Expense',
      value: stats.monthlyExpense,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Monthly Savings',
      value: stats.monthlySavings,
      icon: IndianRupee,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats_items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white overflow-hidden rounded-lg shadow"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 ${item.bgColor} rounded-md p-3`}>
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.title}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      ₹{item.value.toLocaleString('en-IN')}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}