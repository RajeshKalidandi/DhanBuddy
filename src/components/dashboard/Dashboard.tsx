import { useState } from 'react';
import { Plus, Calculator, IndianRupee } from 'lucide-react';
import Header from './Header';
import StatsBar from './StatsBar';
import ExpenseChart from './ExpenseChart';
import TransactionList from './TransactionList';
import AddTransaction from './AddTransaction';
import EMICalculator from './EMICalculator';
import EMIList from './EMIList';
import MonthlyIncomeForm from './MonthlyIncomeForm';
import { useAuth } from '../../hooks/useAuth.tsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isEMICalculatorOpen, setIsEMICalculatorOpen] = useState(false);
  const [isIncomeFormOpen, setIsIncomeFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataUpdated = () => {
    console.log('Refreshing data...');
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Welcome back, {user?.first_name}!
        </h1>
        
        <StatsBar key={refreshKey} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <ExpenseChart key={`expense-${refreshKey}`} />
          <EMIList key={`emi-${refreshKey}`} />
          <div className="lg:col-span-2">
            <TransactionList key={`transactions-${refreshKey}`} />
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col space-y-4">
          <button
            onClick={() => setIsIncomeFormOpen(true)}
            className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-500 transition-colors"
            title="Add Income"
          >
            <IndianRupee className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsEMICalculatorOpen(true)}
            className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-500 transition-colors"
            title="Calculate EMI"
          >
            <Calculator className="h-6 w-6" />
          </button>
          <button
            onClick={() => setIsAddTransactionOpen(true)}
            className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-500 transition-colors"
            title="Add Expense"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Add Transaction Modal */}
        <AddTransaction
          isOpen={isAddTransactionOpen}
          onClose={() => setIsAddTransactionOpen(false)}
          onTransactionAdded={handleDataUpdated}
        />

        {/* EMI Calculator Modal */}
        <EMICalculator
          isOpen={isEMICalculatorOpen}
          onClose={() => setIsEMICalculatorOpen(false)}
          onEMIAdded={handleDataUpdated}
        />

        {/* Monthly Income Form */}
        <MonthlyIncomeForm
          isOpen={isIncomeFormOpen}
          onClose={() => setIsIncomeFormOpen(false)}
          onIncomeAdded={handleDataUpdated}
        />
      </main>
    </div>
  );
} 