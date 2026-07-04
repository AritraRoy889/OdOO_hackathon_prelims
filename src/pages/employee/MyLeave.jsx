import { motion } from 'framer-motion';
import Badge, { statusColor } from '../../components/common/Badge';
import { Plus, CheckCircle, Clock, XCircle } from 'lucide-react';
import { leaveBalance } from '../../data/sampleData';

const myLeaveHistory = [
  { id: 1, type: 'Annual Leave', from: '2026-07-10', to: '2026-07-14', days: 5, status: 'Approved' },
  { id: 2, type: 'Sick Leave', from: '2026-06-28', to: '2026-06-30', days: 3, status: 'Approved' },
  { id: 3, type: 'Casual Leave', from: '2026-05-12', to: '2026-05-12', days: 1, status: 'Approved' },
];

export default function MyLeave() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">My Leave</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your leave requests and balances.</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Apply Leave
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {leaveBalance.slice(0, 4).map((l, i) => (
          <motion.div
            key={l.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors"
          >
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">{l.type}</p>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{l.remaining}</p>
              <p className="text-sm font-medium text-gray-400 pb-1">/ {l.total}</p>
            </div>
            <div className="mt-4 w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5">
              <div 
                className="bg-indigo-500 h-1.5 rounded-full" 
                style={{ width: `${(l.used / l.total) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs font-medium text-gray-400 mt-2 text-right">{l.used} used</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-gray-50 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Leave History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Type</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">From</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">To</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Days</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {myLeaveHistory.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">{record.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{record.from}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{record.to}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{record.days}</td>
                  <td className="px-6 py-4">
                    <Badge label={record.status} color={statusColor(record.status)} dot />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
