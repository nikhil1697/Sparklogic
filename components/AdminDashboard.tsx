import React, { useEffect, useState } from 'react';
import { RegistrationFormData } from '../types';
import { X, Trash2, Download, Search, Database, Settings, Save, Check, Copy, Lock, LogIn } from 'lucide-react';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [registrations, setRegistrations] = useState<RegistrationFormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'registrations' | 'settings'>('registrations');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  
  // Settings State
  const [scriptUrl, setScriptUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');

  useEffect(() => {
    if (isOpen) {
      // Check session authentication
      const auth = sessionStorage.getItem('spark_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }

      // Load Registrations
      const storedRegs = localStorage.getItem('spark_registrations');
      if (storedRegs) {
        setRegistrations(JSON.parse(storedRegs).reverse());
      }

      // Load Settings
      const storedUrl = localStorage.getItem('spark_google_sheet_url');
      if (storedUrl) {
        setScriptUrl(storedUrl);
      }
    } else {
      // Reset sensitive states when closed
      setPassword('');
      setAuthError(false);
    }
  }, [isOpen]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sparkadmin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('spark_admin_auth', 'true');
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('spark_admin_auth');
    setPassword('');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this registration?')) {
      const updated = registrations.filter(r => r.id !== id);
      setRegistrations(updated);
      localStorage.setItem('spark_registrations', JSON.stringify(updated));
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Candidate Name,Email,Mobile,WhatsApp,Qualification,Year,Experience,Reference\n"
      + registrations.map(r => 
          `${r.submittedAt},"${r.candidateName}","${r.email}","${r.mobileNumber}","${r.whatsappNumber}","${r.qualification}","${r.yearOfPassing}","${r.experience}","${r.referenceDetails}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "spark_logic_registrations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    localStorage.setItem('spark_google_sheet_url', scriptUrl);
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Code copied to clipboard!');
  };

  const filteredRegistrations = registrations.filter(r => 
    r.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Script matched to: Timestamp, Email, Candidate Name, Mobile, WhatsApp, Qualification, Year, Experience, Reference
  const googleScriptCode = `function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  // Appending row in exact order of the sheet columns provided
  sheet.appendRow([
    new Date(),               // Timestamp (Column A)
    data.email,               // Email Address (Column B)
    data.candidateName,       // Candidate Name (Column C)
    data.mobileNumber,        // Mobile Number (Column D)
    data.whatsappNumber,      // WhatsApp Number (Column E)
    data.qualification,       // Qualification (Column F)
    data.yearOfPassing,       // Year Of Pass Out (Column G)
    data.experience,          // Any previous work experience (Column H)
    data.referenceDetails     // Reference Details (Column I)
  ]);
  
  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {!isAuthenticated ? (
        <div className="bg-slate-900 border border-slate-700 w-full max-w-md rounded-2xl shadow-2xl p-8 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-blue-600/20 rounded-full mb-4">
              <Lock className="text-blue-500 h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Admin Access</h2>
            <p className="text-slate-400 text-sm">Enter password to manage registrations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className={`w-full bg-slate-800 border ${authError ? 'border-red-500' : 'border-slate-700'} rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                autoFocus
              />
              {authError && <p className="text-red-500 text-xs mt-2">Incorrect password. Try 'sparkadmin'</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login
            </button>
          </form>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-700 w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <Database className="text-blue-500 h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Admin Dashboard</h2>
                <p className="text-slate-400 text-sm">Manage registrations</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="text-slate-400 hover:text-white transition-colors px-3 py-1.5 hover:bg-slate-800 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex border-b border-slate-800 bg-slate-900 px-6">
            <button
              onClick={() => setActiveTab('registrations')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'registrations' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Database size={16} /> Registrations
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Settings size={16} /> Sheet Integration
            </button>
          </div>

          <div className="flex-1 overflow-auto bg-slate-900">
            {activeTab === 'registrations' && (
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-slate-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-4 w-4" />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleExport}
                    disabled={registrations.length === 0}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700 disabled:opacity-50"
                  >
                    <Download size={16} /> Export CSV
                  </button>
                </div>

                <div className="flex-1 overflow-auto">
                  {registrations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                      <Database className="h-12 w-12 mb-4 opacity-20" />
                      <p>No registrations found yet.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead className="bg-slate-800/50 sticky top-0">
                          <tr>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Date</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Candidate</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Contact</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Qualification</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase">Exp & Ref</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {filteredRegistrations.map((reg) => (
                            <tr key={reg.id} className="hover:bg-slate-800/30 transition-colors group">
                              <td className="p-4 text-sm text-slate-400 whitespace-nowrap">
                                {new Date(reg.submittedAt || '').toLocaleDateString()}
                              </td>
                              <td className="p-4">
                                <div className="font-medium text-white">{reg.candidateName}</div>
                                <div className="text-sm text-slate-400">{reg.email}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm text-slate-300">M: {reg.mobileNumber}</div>
                                <div className="text-sm text-slate-300">WA: {reg.whatsappNumber}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-sm text-white">{reg.qualification}</div>
                                <div className="text-xs text-slate-500">Pass: {reg.yearOfPassing}</div>
                              </td>
                              <td className="p-4">
                                <div className="text-xs text-slate-300" title={reg.experience}>Exp: {reg.experience.substring(0, 20)}...</div>
                                <div className="text-xs text-slate-300" title={reg.referenceDetails}>Ref: {reg.referenceDetails.substring(0, 20)}...</div>
                              </td>
                              <td className="p-4 text-right">
                                <button 
                                  onClick={() => reg.id && handleDelete(reg.id)}
                                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                     <Settings size={20} className="text-blue-400" /> Google Sheets Integration
                  </h3>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Google Apps Script Web App URL</label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={scriptUrl} 
                        onChange={(e) => setScriptUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/..."
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                      <button 
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                      >
                        {saveStatus === 'saved' ? <Check size={18} /> : <Save size={18} />}
                        {saveStatus === 'saved' ? 'Saved' : 'Save URL'}
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-3">How to set this up:</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-slate-400">
                      <li>Open your Google Sheet (from the link you have).</li>
                      <li>Go to <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
                      <li>Paste the code below, replacing any existing code.</li>
                      <li>Click <strong>Deploy</strong> &gt; <strong>New deployment</strong>.</li>
                      <li>Select <strong>Web app</strong>. Set "Who has access" to <strong>Anyone</strong>.</li>
                      <li>Deploy, copy the URL, and paste it here.</li>
                    </ol>
                  </div>

                  <div className="mt-4 relative group">
                    <div className="absolute top-2 right-2">
                      <button 
                        onClick={() => copyToClipboard(googleScriptCode)}
                        className="p-2 bg-slate-700 text-slate-300 rounded hover:bg-slate-600 hover:text-white transition-colors"
                        title="Copy Code"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-xs text-green-400 font-mono border border-slate-800">
                      {googleScriptCode}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-800 bg-slate-900 text-xs text-slate-500 flex justify-between">
            <span>Storage: {activeTab === 'registrations' ? 'Local Browser' : (scriptUrl ? 'Linked to Google Sheets' : 'Not Connected')}</span>
            <span>{registrations.length} Records</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;