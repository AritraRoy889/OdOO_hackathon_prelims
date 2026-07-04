import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, Search } from 'lucide-react';
import Badge, { statusColor } from '../../components/common/Badge';
import Avatar from '../../components/common/Avatar';

export default function LeaveApproval() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const fetchAllLeaves = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:4000/api/leave/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.leaves);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const filtered = requests.filter(r => {
    const matchSearch = r.employee_name.toLowerCase().includes(search.toLowerCase()) || r.leave_type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || r.status === filter;
    return matchSearch && matchFilter;
  });

  const pending   = requests.filter(r => r.status === 'Pending').length;
  const approved  = requests.filter(r => r.status === 'Approved').length;
  const rejected  = requests.filter(r => r.status === 'Rejected').length;

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:4000/api/leave/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status } : r));
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (err) {
      alert('Error updating leave request');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Leave Approval</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Review and manage employee leave requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending',  value: pending,  color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-900/20', icon: Clock         },
          { label: 'Approved', value: approved, color: 'text-emerald-600',bg: 'bg-emerald-50 dark:bg-emerald-900/20',icon: CheckCircle  },
          { label: 'Rejected', value: rejected, color: 'text-red-600',    bg: 'bg-red-50 dark:bg-red-900/20',       icon: XCircle      },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4"
          >
            <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
              <s.icon className={`w-6 h-6 ${s.color}`} />
            </div>
            <div>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-800 dark:text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-violet-300 dark:focus:ring-violet-700"
            placeholder="Search by employee or type..." />
        </div>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-1">
          {['All', 'Pending', 'Approved', 'Rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === f ? 'bg-white dark:bg-gray-700 text-violet-700 dark:text-violet-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Requests */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-16 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-400 dark:text-gray-500">Loading requests...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-16 border border-gray-200 dark:border-gray-700 text-center">
            <Clock className="w-12 h-12 text-gray-200 dark:text-gray-700 mx-auto mb-3" />
            <p className="text-gray-400 dark:text-gray-500">No leave requests found</p>
          </div>
        ) : filtered.map((req, i) => (
          <motion.div
            key={req.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar name={req.employee_name} size="lg" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 dark:text-white">{req.employee_name}</p>
                    <Badge label={req.leave_type} color="violet" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate">{req.reason}</p>
                  <div className="flex gap-4 mt-2 text-xs text-gray-400">
                    <span>📅 {req.from_date} → {req.to_date}</span>
                    <span>⏱ {req.days} day{req.days > 1 ? 's' : ''}</span>
                    <span>Applied: {new Date(req.applied_on).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Badge label={req.status} color={statusColor(req.status)} dot />
                {req.status === 'Pending' && (
                  <div className="flex gap-2">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(req.id, 'Approved')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-medium hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4" /> Approve
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(req.id, 'Rejected')}
                      className="flex items-center gap-1.5 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
