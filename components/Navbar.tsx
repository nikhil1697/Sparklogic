import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-1.5 rounded-lg mr-2">
              <Zap className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Spark <span className="text-blue-400">Logic</span>
            </span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">About</button>
              <button onClick={() => scrollToSection('courses')} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Courses</button>
              <button onClick={() => scrollToSection('why-us')} className="text-slate-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Placements</button>
              <button 
                onClick={() => scrollToSection('register')} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Register Now
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => scrollToSection('about')} className="text-slate-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">About</button>
            <button onClick={() => scrollToSection('courses')} className="text-slate-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Courses</button>
            <button onClick={() => scrollToSection('why-us')} className="text-slate-300 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium">Placements</button>
            <button onClick={() => scrollToSection('register')} className="bg-blue-600 text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium mt-4">Register Now</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;