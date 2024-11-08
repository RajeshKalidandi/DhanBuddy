import { TrendingUp, TrendingDown, Wallet, Target } from 'lucide-react';

const stats = [
  {
    name: 'Total Income',
    value: '₹82,400',
    change: '+14.5%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    name: 'Total Expenses',
    value: '₹45,200',
    change: '-8.2%',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    name: 'Current Balance',
    value: '₹37,200',
    change: '+21.3%',
    trend: 'up',
    icon: Wallet,
  },
  {
    name: 'Savings Goal',
    value: '68%',
    change: '₹42,800 / ₹63,000',
    trend: 'neutral',
    icon: Target,
  },
];

export default function StatsBar() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 px-4 py-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
        >
          <dt>
            <div className="absolute rounded-md bg-indigo-100 p-3">
              <stat.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
            </div>
            <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
          </dt>
          <dd className="ml-16 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            <p className={`ml-2 flex items-baseline text-sm font-semibold ${
              stat.trend === 'up' ? 'text-green-600' : 
              stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {stat.change}
            </p>
          </dd>
        </div>
      ))}
    </div>
  );
}