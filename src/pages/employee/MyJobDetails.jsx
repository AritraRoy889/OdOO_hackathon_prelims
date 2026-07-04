import { motion } from 'framer-motion';
import { Briefcase, MapPin, Building2, Calendar, FileText } from 'lucide-react';

export default function MyJobDetails() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Job Details</h1>
        <p className="text-gray-500 dark:text-gray-400">View your current role, department, and employment history.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Current Position</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <Briefcase className="w-5 h-5 text-indigo-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Software Engineer</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Job Title</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <Building2 className="w-5 h-5 text-violet-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Engineering</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Department</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <MapPin className="w-5 h-5 text-emerald-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Bangalore, India</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Jan 10, 2024</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Date of Joining</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Reporting Manager</h2>
          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-sm">
              S
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-lg">Siddharth Sharma</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Engineering Manager</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 cursor-pointer hover:underline">siddharth@hrms.com</p>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Employment Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
              <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">Active / Full-Time</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Probation</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Completed</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-600 dark:text-gray-400">Notice Period</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">60 Days</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
