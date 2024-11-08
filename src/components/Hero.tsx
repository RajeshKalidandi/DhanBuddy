import { motion } from 'framer-motion';
import { IndianRupee, Wallet, TrendingUp, ArrowRight } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-indigo-100 via-white to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-indigo-200 to-indigo-100 opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-200 to-indigo-100 opacity-50 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              #1 Finance App in India 🇮🇳
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900">
              <span className="block text-indigo-600">DhanBuddy</span>
              <span className="block mt-2">Smart Money</span>
              <span className="block">Smarter You</span>
            </h1>
            <p className="mt-6 text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto">
              Your AI-Powered Financial Companion for Smarter Savings, Intelligent Investments, and Financial Freedom
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
              Watch Demo
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-8">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-sm font-medium text-gray-500">Trusted by 1M+ Indians</p>
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="inline-block h-12 w-12 rounded-full ring-4 ring-white"
                    src={`https://i.pravatar.cc/150?img=${i + 1}`}
                    alt=""
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm font-medium text-gray-500">
                  4.9/5 from 10,000+ reviews
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="relative mt-20 lg:mt-28"
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex space-x-6">
              {[
                { Icon: IndianRupee, label: 'Smart Tracking' },
                { Icon: Wallet, label: 'Auto Savings' },
                { Icon: TrendingUp, label: 'AI Insights' }
              ].map(({ Icon, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2 }}
                  className="group relative"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 shadow-lg group-hover:bg-indigo-500 transition-colors">
                    <Icon className="h-10 w-10 text-white" />
                  </div>
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium text-gray-600">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mx-auto max-w-7xl mt-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}