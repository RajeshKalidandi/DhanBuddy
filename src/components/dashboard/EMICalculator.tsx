import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, X, Save } from 'lucide-react';
import axios from 'axios';

interface EMICalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onEMIAdded?: () => void;
}

export default function EMICalculator({ isOpen, onClose, onEMIAdded }: EMICalculatorProps) {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    emiName: '',
    loanType: 'HOME',
    startDate: new Date().toISOString().split('T')[0],
  });

  const [result, setResult] = useState<{
    emi: number;
    totalInterest: number;
    totalAmount: number;
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateEMI = () => {
    if (!formData.loanAmount || !formData.interestRate || !formData.tenure) {
      setError('Please fill in all fields');
      return;
    }

    const P = parseFloat(formData.loanAmount);
    const R = parseFloat(formData.interestRate) / 12 / 100;
    const N = parseFloat(formData.tenure) * 12;

    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    });
    setError(null);
  };

  const handleSave = async () => {
    if (!result || !formData.emiName) {
      setError('Please calculate EMI and provide a name first');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const nextPaymentDate = new Date(formData.startDate);
      nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions/emis/`,
        {
          name: formData.emiName,
          loan_type: formData.loanType,
          loan_amount: parseFloat(formData.loanAmount),
          interest_rate: parseFloat(formData.interestRate),
          tenure_years: parseFloat(formData.tenure),
          emi_amount: result.emi,
          total_interest: result.totalInterest,
          total_amount: result.totalAmount,
          start_date: formData.startDate,
          next_payment_date: nextPaymentDate.toISOString().split('T')[0],
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (onEMIAdded) {
        onEMIAdded();
      }
      
      setFormData({
        loanAmount: '',
        interestRate: '',
        tenure: '',
        emiName: '',
        loanType: 'HOME',
        startDate: new Date().toISOString().split('T')[0],
      });
      setResult(null);
      onClose();
    } catch (error: any) {
      console.error('Failed to save EMI:', error);
      setError(error.response?.data?.message || 'Failed to save EMI. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const loanTypes = [
    { value: 'HOME', label: 'Home Loan' },
    { value: 'CAR', label: 'Car Loan' },
    { value: 'PERSONAL', label: 'Personal Loan' },
    { value: 'EDUCATION', label: 'Education Loan' },
    { value: 'BUSINESS', label: 'Business Loan' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Calculator className="h-6 w-6 mr-2" />
            EMI Calculator
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Type
            </label>
            <select
              value={formData.loanType}
              onChange={(e) => setFormData({ ...formData, loanType: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {loanTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              EMI Name/Description
            </label>
            <input
              type="text"
              value={formData.emiName}
              onChange={(e) => setFormData({ ...formData, emiName: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Home Loan EMI"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              value={formData.loanAmount}
              onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Interest Rate (% per annum)
            </label>
            <input
              type="number"
              value={formData.interestRate}
              onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Loan Tenure (Years)
            </label>
            <input
              type="number"
              value={formData.tenure}
              onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter loan tenure"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <div className="flex gap-4">
            <button
              onClick={calculateEMI}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors"
            >
              Calculate EMI
            </button>
            {result && (
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? 'Saving...' : (
                  <>
                    <Save className="h-4 w-4" />
                    Save EMI
                  </>
                )}
              </button>
            )}
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">EMI Details</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-gray-600">Monthly EMI:</span>
                  <span className="font-semibold">₹{result.emi.toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Total Interest:</span>
                  <span className="font-semibold text-red-600">₹{result.totalInterest.toLocaleString()}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold">₹{result.totalAmount.toLocaleString()}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
} 