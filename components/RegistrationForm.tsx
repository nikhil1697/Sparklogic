import React, { useState } from 'react';
import { RegistrationFormData } from '../types';
import { Send, CheckCircle } from 'lucide-react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    candidateName: '',
    email: '',
    mobileNumber: '',
    whatsappNumber: '',
    qualification: '',
    yearOfPassing: '',
    experience: '',
    referenceDetails: '',
    courseInterest: 'both',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [sendEmailCopy, setSendEmailCopy] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // 1. Prepare Data
    const newRegistration: RegistrationFormData = {
      ...formData,
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString()
    };

    // 2. Save to Local Storage (Always do this as backup)
    const existingData = localStorage.getItem('spark_registrations');
    const registrations = existingData ? JSON.parse(existingData) : [];
    registrations.push(newRegistration);
    localStorage.setItem('spark_registrations', JSON.stringify(registrations));

    // 3. Send to Google Sheets (If configured)
    const googleSheetUrl = localStorage.getItem('spark_google_sheet_url');
    if (googleSheetUrl) {
      try {
        await fetch(googleSheetUrl, {
          method: 'POST',
          mode: 'no-cors', // Important for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRegistration)
        });
        console.log('Sent to Google Sheet');
      } catch (err) {
        console.error('Failed to send to Google Sheet', err);
      }
    }

    // Simulate delay for UX
    setTimeout(() => {
      // 4. Trigger Email Client (Simulating Email Notification)
      if (sendEmailCopy) {
        const subject = `New Registration: ${formData.candidateName} - ${formData.courseInterest.toUpperCase()}`;
        const body = `
New Student Registration Details:

Name: ${formData.candidateName}
Email: ${formData.email}
Mobile: ${formData.mobileNumber}
WhatsApp: ${formData.whatsappNumber}
Qualification: ${formData.qualification} (${formData.yearOfPassing})
Experience: ${formData.experience}
Reference: ${formData.referenceDetails}

--
Sent via Spark Logic Website
        `;
        window.open(`mailto:devopstrainers04@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
      }

      console.log('Form Processed');
      setStatus('success');
      
      // Reset form
      setTimeout(() => setStatus('idle'), 5000);
      setFormData({
        candidateName: '',
        email: '',
        mobileNumber: '',
        whatsappNumber: '',
        qualification: '',
        yearOfPassing: '',
        experience: '',
        referenceDetails: '',
        courseInterest: 'both',
      });
    }, 1000);
  };

  return (
    <section id="register" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-blue-900/20 to-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 lg:flex lg:gap-16 overflow-hidden">
          
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Start Your Journey Today</h2>
            <p className="text-slate-400 text-lg mb-8">
              Fill out the form to book your seat or schedule a free counseling session. Our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900/50 text-blue-400 border border-blue-800">
                    1
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Register</h3>
                  <p className="mt-1 text-slate-400">Submit your basic details including experience and references.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900/50 text-blue-400 border border-blue-800">
                    2
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Verification</h3>
                  <p className="mt-1 text-slate-400">Our team will verify your details and eligibility.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-900/50 text-blue-400 border border-blue-800">
                    3
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Onboarding</h3>
                  <p className="mt-1 text-slate-400">Join the batch and start learning immediately.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-700">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Registration Successful!</h3>
                <p className="text-slate-400 mb-6">Thank you for your interest in Spark Logic. Your details have been recorded.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white text-sm transition-colors"
                >
                  Register Another Student
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name */}
                <div>
                  <label htmlFor="candidateName" className="block text-sm font-medium text-slate-300 mb-1">Candidate Name</label>
                  <input
                    type="text"
                    name="candidateName"
                    id="candidateName"
                    required
                    value={formData.candidateName}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Rahul Sharma"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="rahul.sharma@example.com"
                  />
                </div>

                {/* Mobile & WhatsApp */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="mobileNumber" className="block text-sm font-medium text-slate-300 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      required
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-slate-300 mb-1">WhatsApp Number</label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      id="whatsappNumber"
                      required
                      value={formData.whatsappNumber}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Qualification & Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="qualification" className="block text-sm font-medium text-slate-300 mb-1">Qualification (Grad & Specialization)</label>
                    <input
                      type="text"
                      name="qualification"
                      id="qualification"
                      required
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="B.Tech Computer Science"
                    />
                  </div>
                  <div>
                    <label htmlFor="yearOfPassing" className="block text-sm font-medium text-slate-300 mb-1">Year Of Pass Out</label>
                    <input
                      type="text"
                      name="yearOfPassing"
                      id="yearOfPassing"
                      required
                      value={formData.yearOfPassing}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="2024"
                    />
                  </div>
                </div>

                {/* Experience */}
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-slate-300 mb-1">Previous Work Experience</label>
                  <textarea
                    name="experience"
                    id="experience"
                    rows={2}
                    required
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Company Name, Designation, Duration (or 'Fresher')"
                  />
                </div>

                {/* Reference */}
                <div>
                  <label htmlFor="referenceDetails" className="block text-sm font-medium text-slate-300 mb-1">Reference Details</label>
                  <input
                    type="text"
                    name="referenceDetails"
                    id="referenceDetails"
                    required
                    value={formData.referenceDetails}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Name & Mobile Number (or 'None')"
                  />
                </div>

                {/* Course Interest (Hidden Context) */}
                <div>
                   <label htmlFor="courseInterest" className="block text-sm font-medium text-slate-300 mb-1">Interested Course</label>
                   <select
                    name="courseInterest"
                    id="courseInterest"
                    value={formData.courseInterest}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="devops">DevOps Engineering</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="both">Both / Not Sure</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                   <input 
                     type="checkbox" 
                     id="emailCopy" 
                     checked={sendEmailCopy}
                     onChange={(e) => setSendEmailCopy(e.target.checked)}
                     className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-blue-600 focus:ring-blue-500"
                   />
                   <label htmlFor="emailCopy" className="text-sm text-slate-400 select-none cursor-pointer">
                     Draft an email in my default mail app
                   </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Syncing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Complete Registration <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;