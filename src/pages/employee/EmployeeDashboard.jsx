import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Clock, CalendarDays, DollarSign, CheckCircle } from 'lucide-react';
import StatCard from '../../components/common/StatCard';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  
  const stats = [
    { title: 'Attendance Rate', value: '96%', subtitle: 'This month', icon: CheckCircle, color: 'emerald' },
    { title: 'Leave Balance', value: '8 days', subtitle: 'Annual leave', icon: CalendarDays, color: 'indigo' },
    { title: 'Next Holiday', value: 'Aug 15', subtitle: 'Independence Day', icon: Clock, color: 'orange' },
    { title: 'Last Payout', value: '$4,200', subtitle: 'June 2026', icon: DollarSign, color: 'indigo' },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500 dark:text-gray-400">Here is a quick overview of your personal metrics.</p>
          </div>
          {user?.employeeId && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 px-4 py-2 rounded-xl flex items-center gap-2">
              <span className="text-xs text-indigo-400 uppercase tracking-wider font-bold">#</span>
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">{user.employeeId}</span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={s.title} {...s} index={i} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Checked in at 09:00 AM today</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Payslip for June generated</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Leave request approved</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Schedule</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Quarterly Review</p>
                <p className="text-xs text-gray-500 mt-1">July 10, 2026</p>
              </div>
              <Clock className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Company All-Hands</p>
                <p className="text-xs text-gray-500 mt-1">July 15, 2026</p>
              </div>
              <CalendarDays className="w-5 h-5 text-indigo-500" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
