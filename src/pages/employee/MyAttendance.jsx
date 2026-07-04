import { motion } from 'framer-motion';
import Badge, { statusColor } from '../../components/common/Badge';
import { Clock, Calendar } from 'lucide-react';

const mockAttendance = [
  { date: '2026-07-04', checkIn: '09:05 AM', checkOut: '--', status: 'Present', hours: '--' },
  { date: '2026-07-03', checkIn: '08:55 AM', checkOut: '06:10 PM', status: 'Present', hours: '9h 15m' },
  { date: '2026-07-02', checkIn: '09:30 AM', checkOut: '06:00 PM', status: 'Late', hours: '8h 30m' },
  { date: '2026-07-01', checkIn: '--', checkOut: '--', status: 'Absent', hours: '--' },
];

export default function MyAttendance() {
  return (
    <div className="space-y-6 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Attendance</h1>
          <p className="text-gray-500 dark:text-gray-400">View your daily logs and check-in times.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors">
          <Clock className="w-4 h-4" /> Web Check-in
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Date</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Check In</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Check Out</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Hours</th>
                <th className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800/50">
              {mockAttendance.map((record, i) => (
                <tr key={i} className="hover:bg-gray-50/70 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" /> {record.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{record.checkIn}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{record.checkOut}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-300">{record.hours}</td>
                  <td className="px-6 py-4"><Badge label={record.status} color={statusColor(record.status)} dot /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
