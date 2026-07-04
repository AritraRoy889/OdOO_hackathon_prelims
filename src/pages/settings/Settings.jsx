import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Monitor, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const tabs = [
  { id: 'profile',   label: 'Profile Settings', icon: User    },
  { id: 'password',  label: 'Change Password',  icon: Lock    },
  { id: 'notif',     label: 'Notifications',    icon: Bell    },
  { id: 'system',    label: 'System Settings',  icon: Monitor },
];

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { dark, toggle } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  // Profile form
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    department: user?.department || '',
    address: user?.address || '',
    avatar: user?.avatar || '',
  });

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(p => ({ ...p, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Password form
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');

  // Notifications
  const [notifs, setNotifs] = useState({
    emailLeave:       true,
    emailAttendance:  false,
    emailPayroll:     true,
    pushNew:          true,
    pushLeave:        true,
    pushPayroll:      false,
  });

  const showSaved = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUser(profile);
    showSaved();
  };

  const handlePasswordSave = (e) => {
    e.preventDefault();
    setPwError('');
    if (pwForm.current !== 'admin123') { setPwError('Current password is incorrect'); return; }
    if (pwForm.newPw.length < 6) { setPwError('New password must be at least 6 characters'); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError('Passwords do not match'); return; }
    setPwForm({ current: '', newPw: '', confirm: '' });
    showSaved();
  };

  const ToggleSwitch = ({ checked, onChange }) => (
    <button onClick={() => onChange(!checked)} className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-violet-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  const inputCls = "w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700 transition-all";
  const labelCls = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Manage your account and preferences</p>
      </div>

      {/* Saved toast */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 right-6 z-50 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium"
        >
          <CheckCircle className="w-4 h-4" /> Changes saved successfully!
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-3 h-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${activeTab === id ? 'bg-violet-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          className="flex-1"
        >
          {/* Profile */}
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSave} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Profile Settings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Update your personal information</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover shadow-md border border-gray-200 dark:border-gray-700" />
                  ) : (
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{profile.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.role || 'Admin'}</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-violet-600 hover:text-violet-700 mt-1 font-medium"
                    >
                      Change photo
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={labelCls}>Full Name</label><input className={inputCls} value={profile.name} onChange={e => setProfile(p=>({...p,name:e.target.value}))} /></div>
                  <div><label className={labelCls}>Email Address</label><input className={inputCls} type="email" value={profile.email} onChange={e => setProfile(p=>({...p,email:e.target.value}))} /></div>
                  <div><label className={labelCls}>Phone Number</label><input className={inputCls} value={profile.phone} onChange={e => setProfile(p=>({...p,phone:e.target.value}))} /></div>
                  <div><label className={labelCls}>Department</label><input className={inputCls} value={profile.department} onChange={e => setProfile(p=>({...p,department:e.target.value}))} /></div>
                  <div className="sm:col-span-2"><label className={labelCls}>Address</label><input className={inputCls} value={profile.address} onChange={e => setProfile(p=>({...p,address:e.target.value}))} /></div>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm">Save Changes</button>
              </div>
            </form>
          )}

          {/* Password */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSave} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Update your account password</p>
              </div>
              <div className="p-6 space-y-4 max-w-md">
                {pwError && <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 text-sm text-red-600 dark:text-red-400">{pwError}</div>}
                <div><label className={labelCls}>Current Password</label><input className={inputCls} type="password" value={pwForm.current} onChange={e => setPwForm(p=>({...p,current:e.target.value}))} placeholder="••••••••" /></div>
                <div><label className={labelCls}>New Password</label><input className={inputCls} type="password" value={pwForm.newPw} onChange={e => setPwForm(p=>({...p,newPw:e.target.value}))} placeholder="••••••••" /></div>
                <div><label className={labelCls}>Confirm Password</label><input className={inputCls} type="password" value={pwForm.confirm} onChange={e => setPwForm(p=>({...p,confirm:e.target.value}))} placeholder="••••••••" /></div>
                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-3">
                  <p className="text-xs text-violet-600 dark:text-violet-400 font-medium">Password requirements:</p>
                  <ul className="text-xs text-violet-500 dark:text-violet-400 mt-1 space-y-0.5 list-disc list-inside">
                    <li>Minimum 6 characters</li>
                    <li>Use a mix of letters and numbers</li>
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button type="submit" className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm">Update Password</button>
              </div>
            </form>
          )}

          {/* Notifications */}
          {activeTab === 'notif' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notification Preferences</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Choose what you want to be notified about</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { section: 'Email Notifications', items: [
                    { key: 'emailLeave',      label: 'Leave Request Updates',  desc: 'When leave is applied or status changes' },
                    { key: 'emailAttendance', label: 'Attendance Alerts',      desc: 'Daily attendance summary emails' },
                    { key: 'emailPayroll',    label: 'Payroll Processed',      desc: 'When payslip is generated' },
                  ]},
                  { section: 'Push Notifications', items: [
                    { key: 'pushNew',         label: 'New Employee Added',     desc: 'When a new employee joins' },
                    { key: 'pushLeave',       label: 'Leave Approvals',        desc: 'Leave approval/rejection alerts' },
                    { key: 'pushPayroll',     label: 'Payroll Reminders',      desc: 'Remind about pending payroll' },
                  ]},
                ].map(({ section, items }) => (
                  <div key={section}>
                    <p className="text-xs font-semibold text-violet-600 uppercase tracking-wider mb-3">{section}</p>
                    <div className="space-y-3">
                      {items.map(({ key, label, desc }) => (
                        <div key={key} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                          </div>
                          <ToggleSwitch checked={notifs[key]} onChange={v => setNotifs(n => ({...n, [key]: v}))} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                <button onClick={showSaved} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm">Save Preferences</button>
              </div>
            </div>
          )}

          {/* System */}
          {activeTab === 'system' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">System Settings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Configure your system preferences</p>
              </div>
              <div className="p-6 space-y-4">
                {[
                  { label: 'Dark Mode', desc: 'Switch between light and dark theme', checked: dark, onChange: toggle },
                ].map(({ label, desc, checked, onChange }) => (
                  <div key={label} className="flex items-center justify-between py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                    </div>
                    <ToggleSwitch checked={checked} onChange={onChange} />
                  </div>
                ))}
                <div className="py-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1.5">Language</p>
                  <select className={`${inputCls} w-48`}><option>English (India)</option><option>Hindi</option></select>
                </div>
                <div className="py-3">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1.5">Currency</p>
                  <select className={`${inputCls} w-48`}><option>₹ INR</option><option>$ USD</option></select>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400">HRMS v1.0.0 · © 2026 Human Resource Management System</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
