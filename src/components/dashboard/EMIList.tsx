import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { IndianRupee, Calendar, AlertCircle } from 'lucide-react';

interface EMI {
  id: number;
  name: string;
  loan_type: string;
  loan_amount: number;
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

  const fetchEMIs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions/emis/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log('EMIs fetched:', response.data);
      const emisData = response.data.results || [];
      setEmis(Array.isArray(emisData) ? emisData : []);
    } catch (error) {
      console.error('Failed to fetch EMIs:', error);
      setError('Failed to load EMIs');
      setEmis([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEMIs();
  }, [activeTab]);

  const activeEMIs = emis.filter(emi => {
    const progressPercentage = emi.progress_percentage || 0;
    return progressPercentage < 100;
  });

  const completedEMIs = emis.filter(emi => {
    const progressPercentage = emi.progress_percentage || 0;
    return progressPercentage >= 100;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
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
        <div className="flex items-center justify-center text-red-500 gap-2">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const displayEMIs = activeTab === 'active' ? activeEMIs : completedEMIs;

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
        {displayEMIs.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No {activeTab} EMIs found</p>
            <p className="text-sm text-gray-400 mt-1">
              {activeTab === 'active' 
                ? 'Add a new EMI to start tracking your loans'
                : 'Complete your active EMIs to see them here'}
            </p>
          </div>
        ) : (
          displayEMIs.map((emi) => (
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
                  <span>Progress</span>
                  <span>{emi.progress_percentage.toFixed(1)}%</span>
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

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div className="text-gray-500">
                  <p>Loan Amount: {formatCurrency(emi.loan_amount)}</p>
                  <p>Total Interest: {formatCurrency(emi.total_interest)}</p>
                </div>
                <div className="text-right text-gray-500">
                  <p>Start Date: {formatDate(emi.start_date)}</p>
                  <p>Next Payment: {formatDate(emi.next_payment_date)}</p>
                </div>
              </div>

              {emi.next_payment_in_days <= 7 && activeTab === 'active' && (
                <div className="mt-4 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Payment due in {emi.next_payment_in_days} days
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
} 