import { motion } from 'framer-motion';
import { PieChart, Target, Brain, BookOpen, ArrowUpRight } from 'lucide-react';

const features = [
  {
    name: 'Smart Budget Tracking',
    description: 'Automatically categorize expenses and get AI-powered insights on your spending patterns.',
    icon: PieChart,
  },
  {
    name: 'Goal-Based Savings',
    description: 'Set and track multiple savings goals with intelligent progress monitoring.',
    icon: Target,
  },
  {
    name: 'Purchase Planning',
    description: 'Get personalized recommendations on major purchases based on your financial health.',
    icon: Brain,
  },
  {
    name: 'Financial Education',
    description: 'Access India-specific financial literacy content and expert insights.',
    icon: BookOpen,
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-indigo-600"
          >
            Powerful Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Everything you need to master your finances
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-600 group-hover:bg-indigo-500 transition-colors">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="flex items-center">
                      {feature.name}
                      <ArrowUpRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}