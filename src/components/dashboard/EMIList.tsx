import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar } from 'lucide-react';

interface EMI {
  id: number;
  name: string;
  loan_type: string;
  emi_amount: number;
  next_payment_date: string;
  next_payment_in_days: number;
  progress_percentage: number;
  total_amount: number;
  total_interest: number;
  start_date: string;
}

export default function EMIList() {
  const [emis, setEmis] = useState<EMI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    fetchEMIs();
  }, []);

  const fetchEMIs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions/emis/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setEmis(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch EMIs:', error);
      setError('Failed to load EMIs');
      setEmis([]);
    } finally {
      setLoading(false);
    }
  };

  const activeEMIs = Array.isArray(emis) 
    ? emis.filter(emi => emi.progress_percentage < 100)
    : [];
  
  const completedEMIs = Array.isArray(emis)
    ? emis.filter(emi => emi.progress_percentage >= 100)
    : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">EMIs</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'active'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({activeEMIs.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              activeTab === 'completed'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completed ({completedEMIs.length})
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {!Array.isArray(emis) || emis.length === 0 ? (
          <p className="text-center text-gray-500 py-4">No EMIs found</p>
        ) : (
          (activeTab === 'active' ? activeEMIs : completedEMIs).map((emi) => (
            <motion.div
              key={emi.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{emi.name}</h3>
                  <p className="text-sm text-gray-500">{emi.loan_type}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(emi.emi_amount)}
                  </p>
                  <p className="text-sm text-gray-500">per month</p>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Total Progress</span>
                  <span>{emi.progress_percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      emi.progress_percentage >= 100 ? 'bg-green-600' : 'bg-indigo-600'
                    }`}
                    style={{ width: `${Math.min(emi.progress_percentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  Next payment in {emi.next_payment_in_days} days
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emi.next_payment_in_days <= 7
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {emi.next_payment_in_days <= 7 ? 'Due Soon' : 'On Track'}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 