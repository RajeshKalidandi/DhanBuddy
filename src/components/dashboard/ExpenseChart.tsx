import { PieChart, DollarSign, ShoppingCart, Home, Car, Heart, Coffee, Smartphone } from 'lucide-react';

const categories = [
  { name: 'Housing', amount: 18500, icon: Home, color: 'bg-blue-500' },
  { name: 'Transportation', amount: 8200, icon: Car, color: 'bg-green-500' },
  { name: 'Healthcare', amount: 6400, icon: Heart, color: 'bg-red-500' },
  { name: 'Food & Dining', amount: 5600, icon: Coffee, color: 'bg-yellow-500' },
  { name: 'Entertainment', amount: 3800, icon: Smartphone, color: 'bg-purple-500' },
];

export default function ExpenseChart() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Expense Categories</h2>
          <PieChart className="h-5 w-5 text-gray-500" />
        </div>
        
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category.color}`}>
                  <category.icon className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-gray-700">{category.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-semibold">₹{category.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}