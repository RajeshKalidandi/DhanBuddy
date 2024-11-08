import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'Is DhanBuddy free to use?',
    answer: 'Yes, DhanBuddy offers a free plan with essential features. Premium features are available with our paid plans.',
  },
  {
    question: 'How secure is my financial data?',
    answer: 'We use bank-grade encryption and security measures to protect your data. Your security is our top priority.',
  },
  {
    question: 'Can I connect multiple bank accounts?',
    answer: 'Yes, you can connect multiple Indian bank accounts to track all your finances in one place.',
  },
  {
    question: 'Do you support UPI transactions?',
    answer: 'Yes, DhanBuddy supports tracking of all UPI transactions across different payment apps.',
  },
  {
    question: 'How does the AI-powered categorization work?',
    answer: 'Our AI automatically categorizes your transactions based on patterns and descriptions, learning from your corrections.',
  },
  {
    question: 'Can I export my financial reports?',
    answer: 'Yes, you can export your reports in PDF and Excel formats for tax and analysis purposes.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-base font-semibold text-indigo-600">FAQ</h2>
          <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know about DhanBuddy
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="py-6"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-gray-600"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}