import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, IndianRupee } from 'lucide-react';
import axios from 'axios';

interface MonthlyIncomeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onIncomeAdded?: () => void;
}

export default function MonthlyIncomeForm({ isOpen, onClose, onIncomeAdded }: MonthlyIncomeFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Salary',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!formData.amount) {
      setError('Please enter the income amount');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions/transactions/`,
        {
          amount: formData.amount,
          transaction_type: 'INCOME',
          category_name: formData.category,
          description: formData.description,
          date: formData.date,
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (onIncomeAdded) {
        onIncomeAdded();
      }
      
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        category: 'Salary',
      });
      onClose();
    } catch (error: any) {
      console.error('Failed to save income:', error);
      setError(error.response?.data?.message || 'Failed to save income. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <IndianRupee className="h-6 w-6 mr-2" />
            Add Monthly Income
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Income Type
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Business">Business</option>
              <option value="Investment">Investment</option>
              <option value="Rental">Rental</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Monthly Salary - November"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? 'Saving...' : (
              <>
                <Save className="h-4 w-4" />
                Save Income
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
} 