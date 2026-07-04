import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Bell, Sun, Moon, Search, ChevronDown,
  User, Settings, LogOut, Check, Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const breadcrumbMap = {
  '/dashboard':      'Dashboard',
  '/employees':      'Employees',
  '/attendance':     'Attendance',
  '/leave':          'Leave Management',
  '/leave/approval': 'Leave Approval',
  '/payroll':        'Payroll',
  '/admin':          'Admin Panel',
  '/reports':        'Reports',
  '/settings':       'Settings',
  '/emp/dashboard':  'Employee Dashboard',
  '/emp/job-details':'Job Details',
  '/emp/attendance': 'My Attendance',
  '/emp/leave':      'My Leave',
  '/emp/payroll':    'My Payroll',
  '/emp/documents':  'My Documents',
  '/emp/settings':   'My Settings',
};

const notifications = [
  { id: 1, text: 'Rahul Verma applied for sick leave',   time: '2h ago', read: false, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
  { id: 2, text: 'June payroll processed successfully',  time: '1d ago', read: false, color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { id: 3, text: 'Amit Kumar: paternity leave request',  time: '3h ago', read: false, color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { id: 4, text: 'Kavya Nair leave approved',           time: '1d ago', read: true,  color: 'bg-gray-100 dark:bg-gray-800 text-gray-500' },
  { id: 5, text: 'New employee Divya Reddy onboarded',  time: '2d ago', read: true,  color: 'bg-gray-100 dark:bg-gray-800 text-gray-500' },
];

export default function TopNav({ setMobileOpen }) {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotif, setShowNotif]   = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifList, setNotifList]   = useState(notifications);
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  const unread = notifList.filter(n => !n.read).length;
  const page   = breadcrumbMap[location.pathname] || 'HRMS';

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target))   setShowNotif(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-bold text-gray-900 dark:text-white leading-none">{page}</h1>
          <p className="text-[11px] text-gray-400 mt-0.5">Home &rsaquo; {page}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1.5">
        {/* Search */}
        <div className={`hidden md:flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 ${searchFocused ? 'bg-white dark:bg-gray-800 ring-2 ring-indigo-300 dark:ring-indigo-600 w-52' : 'bg-gray-100 dark:bg-gray-800 w-44'}`}>
          <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          <input
            className="bg-transparent text-sm text-gray-600 dark:text-gray-300 placeholder-gray-400 outline-none w-full"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        {/* Dark mode */}
        <button
          onClick={toggle}
          className="p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          title={dark ? 'Light mode' : 'Dark mode'}
        >
          {dark ? <Sun className="w-4.5 h-4.5 w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
            className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <Bell className="w-[18px] h-[18px]" />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
            )}
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-black/30 border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 dark:border-gray-800">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">Notifications</p>
                    {unread > 0 && <p className="text-xs text-gray-400">{unread} unread</p>}
                  </div>
                  <button
                    onClick={() => setNotifList(n => n.map(x => ({ ...x, read: true })))}
                    className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                </div>
                <div className="max-h-72 overflow-y-auto scrollbar-thin divide-y divide-gray-50 dark:divide-gray-800">
                  {notifList.map(n => (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-default ${!n.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!n.read ? 'bg-indigo-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{n.text}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xs">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
              {user?.name?.split(' ')[0] || 'Admin'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-gray-200/60 dark:shadow-black/30 border border-gray-100 dark:border-gray-800 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{user?.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{user?.email}</p>
                  <span className="inline-flex items-center gap-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1.5">
                    <Sparkles className="w-2.5 h-2.5" /> Administrator
                  </span>
                </div>
                {[
                  { icon: User,     label: 'My Profile', action: () => navigate(user?.role === 'Employee' ? '/emp/settings' : '/settings') },
                  { icon: Settings, label: 'Settings',   action: () => navigate(user?.role === 'Employee' ? '/emp/settings' : '/settings') },
                ].map(({ icon: Icon, label, action }) => (
                  <button key={label} onClick={() => { action(); setShowProfile(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <Icon className="w-4 h-4 text-gray-400" />{label}
                  </button>
                ))}
                <div className="border-t border-gray-50 dark:border-gray-800">
                  <button
                    onClick={() => { logout(); navigate('/login'); }}
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Log Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
