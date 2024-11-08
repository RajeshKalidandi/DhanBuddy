import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Onboarding from './Onboarding';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <Onboarding />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
} 