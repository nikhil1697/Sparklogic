import React from 'react';
import { Zap, Github, Linkedin, Twitter, Mail, MapPin, Phone, Lock } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-1.5 rounded-lg mr-2">
                <Zap className="h-5 w-5 text-white" fill="currentColor" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Spark <span className="text-blue-400">Logic</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Empowering the next generation of tech leaders with industry-standard training in DevOps and Full Stack Development.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-blue-400 transition-colors">Home</button></li>
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-blue-400 transition-colors">About Us</button></li>
              <li><button onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-blue-400 transition-colors">Courses</button></li>
              <li><button onClick={() => document.getElementById('register')?.scrollIntoView({ behavior: 'smooth'})} className="hover:text-blue-400 transition-colors">Registration</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Courses</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>DevOps Engineering</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Full Stack Development</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>Cloud Computing (AWS)</li>
              <li className="flex items-center"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>MERN Stack</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-blue-500 mt-0.5" />
                <span>123 Tech Park, Innovation Street,<br/>Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-blue-500" />
                <span>devopstrainers04@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-blue-500" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 text-sm">© 2024 Spark Logic Institute. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0 text-sm text-slate-600">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <button 
              onClick={onOpenAdmin}
              className="flex items-center gap-1 hover:text-blue-400 transition-colors"
              title="Admin Access"
            >
              <Lock size={14} /> <span className="text-xs">Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;