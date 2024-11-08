import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Smartphone, Shield, Target, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const steps = [
  {
    id: '01',
    name: 'Quick Profile Setup',
    description: 'Enter your basic details and financial information in under 2 minutes.',
    icon: Smartphone,
    color: 'bg-blue-500'
  },
  {
    id: '02',
    name: 'Secure Connection',
    description: 'Safely connect your bank accounts with bank-grade encryption.',
    icon: Shield,
    color: 'bg-green-500'
  },
  {
    id: '03',
    name: 'Set Your Goals',
    description: 'Define your savings goals and investment objectives.',
    icon: Target,
    color: 'bg-purple-500'
  },
  {
    id: '04',
    name: 'Start Your Journey',
    description: 'Get personalized insights and start building wealth.',
    icon: Rocket,
    color: 'bg-orange-500'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleCreateAccount = () => {
    // If user is logged in, go to dashboard
    if (user) {
      navigate('/dashboard');
    } else {
      // If not logged in, go to registration
      navigate('/register');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-indigo-50 to-white py-24 sm:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/4" width="800" height="800" fill="none" viewBox="0 0 800 800">
          <circle cx="400" cy="400" r="400" fill="url(#gradient1)" fillOpacity="0.1" />
          <defs>
            <radialGradient id="gradient1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(90) scale(400)">
              <stop stopColor="#4F46E5" />
              <stop offset="1" stopColor="#4F46E5" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Get Started in Minutes
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900">
            Your Journey to Financial Freedom
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Join 1M+ Indians who have transformed their financial lives with DhanBuddy
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-4"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className="relative group"
            >
              <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"></div>
              <div className="relative">
                <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${step.color}`}>
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mt-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    Step {step.id}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-gray-900">
                    {step.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="absolute top-8 -right-4 h-6 w-6 text-gray-400 hidden lg:block" />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <button
            onClick={handleCreateAccount}
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-colors"
          >
            {user ? 'Go to Dashboard' : 'Create Free Account'}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}