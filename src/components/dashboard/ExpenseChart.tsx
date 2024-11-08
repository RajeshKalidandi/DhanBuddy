import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { transactionService } from '../../services/api';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

export default function ExpenseChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await transactionService.getTransactions();
        const transactions = response.data;
        
        // Group expenses by category
        const expensesByCategory = transactions
          .filter((t: any) => t.category.type === 'EXPENSE')
          .reduce((acc: any, t: any) => {
            const categoryName = t.category.name;
            if (!acc[categoryName]) {
              acc[categoryName] = {
                value: 0,
                color: t.category.color,
              };
            }
            acc[categoryName].value += t.amount;
            return acc;
          }, {});

        // Transform data for chart
        const chartData = Object.entries(expensesByCategory).map(([name, data]: [string, any]) => ({
          name,
          value: data.value,
          color: data.color,
        }));

        setData(chartData);
      } catch (err) {
        setError('Failed to load expense data');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow h-96 flex items-center justify-center">
        <div className="text-gray-500">Loading expense data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow h-96 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Expense Breakdown
      </h2>
      
      {data.length === 0 ? (
        <div className="h-80 flex items-center justify-center text-gray-500">
          No expense data available
        </div>
      ) : (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-sm">
            <div className="text-gray-500">Total Expenses</div>
            <div className="text-lg font-semibold text-gray-900">
              ₹{data.reduce((sum, item) => sum + item.value, 0).toLocaleString('en-IN')}
            </div>
          </div>
          <div className="text-sm">
            <div className="text-gray-500">Categories</div>
            <div className="text-lg font-semibold text-gray-900">
              {data.length}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}