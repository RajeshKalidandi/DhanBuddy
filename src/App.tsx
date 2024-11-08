import React, { useState } from 'react';
import Hero from './components/Hero';
import Features from './components/Features';
import Onboarding from './components/Onboarding';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Header from './components/dashboard/Header';
import StatsBar from './components/dashboard/StatsBar';
import ExpenseChart from './components/dashboard/ExpenseChart';
import TransactionList from './components/dashboard/TransactionList';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto py-6">
          <div className="flex justify-end px-4 mb-6">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-500"
            >
              Sign Out
            </button>
          </div>
          <StatsBar />
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 px-4">
            <div className="lg:col-span-1">
              <ExpenseChart />
            </div>
            <div className="lg:col-span-2">
              <TransactionList />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Onboarding />
      <Testimonials />
      <FAQ />
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleLogin}
          className="px-6 py-3 text-white bg-indigo-600 rounded-xl shadow-lg hover:bg-indigo-500 transition-colors"
        >
          Demo Dashboard
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;