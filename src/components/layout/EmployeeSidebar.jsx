import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  CheckCircle,
  CalendarDays,
  DollarSign,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard',   path: '/emp/dashboard' },
  { icon: Briefcase,       label: 'Job Details', path: '/emp/job-details' },
  { icon: CheckCircle,     label: 'My Attendance', path: '/emp/attendance' },
  { icon: CalendarDays,    label: 'My Leave',      path: '/emp/leave' },
  { icon: DollarSign,      label: 'My Payroll',    path: '/emp/payroll' },
  { icon: FileText,        label: 'Documents',   path: '/emp/documents' },
];

export default function EmployeeSidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full overflow-hidden">
      <div className={`h-16 flex items-center ${collapsed ? 'justify-center px-0' : 'px-6'} border-b border-gray-800 flex-shrink-0 transition-all duration-300`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-4 h-4 text-white" />
          </div>
          {!collapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap overflow-hidden">
              <span className="text-white font-bold text-lg leading-none block">Employee</span>
              <span className="text-indigo-400 text-xs">Portal</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className={`text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider ${collapsed ? 'text-center' : ''}`}>Menu</p>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400' 
                    : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
                }`}
                title={collapsed ? item.label : undefined}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"
                  />
                )}
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-gray-300'}`} />
                {!collapsed && (
                  <span className="font-medium text-sm whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        {!collapsed ? (
          <div className="bg-gray-800/50 rounded-xl p-3 flex items-center gap-3 mb-3 hover:bg-gray-800 transition-colors">
            <Avatar name={user?.name || 'User'} role="Employee" size="sm" />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[10px] text-white/60 uppercase tracking-wider">{user?.role || 'Employee'}</span>
                {user?.employeeId && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-indigo-400/50" />
                    <span className="text-xs text-indigo-300 font-medium">{user.employeeId}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-3">
            <Avatar name={user?.name} src={user?.avatar} size="sm" />
          </div>
        )}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${collapsed ? 'justify-center' : ''} gap-3 px-3 py-2.5 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-colors`}
          title={collapsed ? 'Log Out' : undefined}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-gray-900 border-r border-gray-800 z-50 transition-all duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ width: collapsed ? 72 : 240 }}
      >
        <SidebarContent />

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3.5 top-20 w-7 h-7 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-600 shadow-sm transition-colors z-50"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>
    </>
  );
}
