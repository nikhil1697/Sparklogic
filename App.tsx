import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import CourseSection from './components/CourseSection';
import RegistrationForm from './components/RegistrationForm';
import AIChat from './components/AIChat';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <About />
          <CourseSection />
          <RegistrationForm />
        </main>
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
        <AIChat />
        <AdminDashboard isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </HashRouter>
  );
}

export default App;