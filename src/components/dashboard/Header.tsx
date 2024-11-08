import { Calendar, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">DhanBuddy</span>
            <span className="ml-2 text-sm text-gray-500">Your Financial Companion</span>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-lg">
            <Calendar className="h-5 w-5 text-gray-500" />
            <select className="bg-transparent text-sm font-medium text-gray-700 focus:outline-none">
              <option>Last 30 Days</option>
              <option>This Month</option>
              <option>Last Quarter</option>
              <option>This Year</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <User className="h-6 w-6" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}