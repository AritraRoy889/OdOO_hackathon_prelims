import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import Badge, { statusColor } from '../../components/common/Badge';

const myPayroll = [
  { id: 1, month: 'June 2026', basic: 72000, allowances: 7200, deductions: 8640, net: 92160, status: 'Paid', paidOn: '2026-06-30' },
  { id: 2, month: 'May 2026', basic: 72000, allowances: 7200, deductions: 8640, net: 92160, status: 'Paid', paidOn: '2026-05-31' },
  { id: 3, month: 'April 2026', basic: 72000, allowances: 7200, deductions: 8640, net: 92160, status: 'Paid', paidOn: '2026-04-30' },
];

export default function MyPayroll() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">My Payroll</h1>
          <p className="text-gray-500 dark:text-gray-400">View and download your monthly payslips.</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Month</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Basic Pay</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Net Salary</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {myPayroll.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-indigo-400" /> {record.month}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">₹{record.basic.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">₹{record.net.toLocaleString()}</td>
                  <td className="px-6 py-4"><Badge label={record.status} color={statusColor(record.status)} dot /></td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
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
