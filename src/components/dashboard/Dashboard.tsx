import { useState } from 'react';
import { Plus, Calculator } from 'lucide-react';
import Header from './Header';
import StatsBar from './StatsBar';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import EMICalculator from './EMICalculator';
import EMIList from './EMIList';
import { useAuth } from '../../hooks/useAuth.tsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isEMICalculatorOpen, setIsEMICalculatorOpen] = useState(false);

  const handleTransactionAdded = () => {
    // Refresh data
    window.location.reload();
  };

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
          <EMIList />
          <div className="lg:col-span-2">
            <TransactionList />
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={() => setIsEMICalculatorOpen(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition-colors"
            title="Calculate EMI"
          >
            <Calculator className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsAddTransactionOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
            title="Add Transaction"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Add Transaction Modal */}
        <AddTransaction
          isOpen={isAddTransactionOpen}
          onClose={() => setIsAddTransactionOpen(false)}
          onTransactionAdded={handleTransactionAdded}
        />

        {/* EMI Calculator Modal */}
        <EMICalculator
          isOpen={isEMICalculatorOpen}
          onClose={() => setIsEMICalculatorOpen(false)}
        />
      </main>
    </div>
  );
} 