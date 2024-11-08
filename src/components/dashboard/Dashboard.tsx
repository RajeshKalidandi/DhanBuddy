import { motion } from 'framer-motion';
import Header from './Header';
import StatsBar from './StatsBar';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <StatsBar />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <ExpenseChart />
            </div>
            <div className="lg:col-span-2">
              <TransactionList />
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 