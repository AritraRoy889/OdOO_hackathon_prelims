import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Briefcase, ArrowRight, Users, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const features = [
  { icon: Users,     title: 'Employee Management',  desc: 'Manage your entire workforce in one place' },
  { icon: Clock,     title: 'Attendance Tracking',  desc: 'Real-time check-in/out and reporting' },
  { icon: TrendingUp,title: 'Payroll & Analytics',  desc: 'Automate payroll and gain insights' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm]     = useState({ identifier: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate identifier format
    const isEmployeeId = /^EMP-\d+$/i.test(form.identifier.trim());
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.identifier.trim());
    
    if (!isEmployeeId && !isEmail) {
      setError("Please enter a valid Email Address or Employee ID (e.g., EMP-1234)");
      return;
    }

    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = await login(form.identifier, form.password);
    setLoading(false);
    if (result.success) {
      if (result.user.role === 'Employee') {
        navigate('/emp/dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 relative overflow-hidden flex-col p-12 justify-between">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-300/10 rounded-full blur-2xl" />

        {/* Logo */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">HRMS</p>
              <p className="text-indigo-200 text-xs">Human Resource Suite</p>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity:0, x:-30 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:0.15 }}
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold text-white leading-tight">
            Manage your team<br />
            <span className="text-indigo-200">smarter, faster.</span>
          </h1>
          <p className="mt-4 text-indigo-200 text-base leading-relaxed max-w-xs">
            A complete HR platform to streamline employees, attendance, leave, and payroll — all in one beautiful interface.
          </p>

          <div className="mt-10 space-y-4">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity:0, x:-20 }}
                animate={{ opacity:1, x:0 }}
                transition={{ delay: 0.25 + i * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-indigo-300 text-xs mt-0.5">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom stats strip */}
        <motion.div
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.4 }}
          className="relative z-10 flex gap-6"
        >
          {[['12+','Employees'],['99%','Uptime'],['4.9★','Rating']].map(([val,label]) => (
            <div key={label}>
              <p className="text-white font-bold text-xl">{val}</p>
              <p className="text-indigo-300 text-xs">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-950 p-6">
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.4 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-gray-900 dark:text-white text-lg">HRMS</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign in to your account</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Welcome back! Please enter your credentials.</p>
          </div>

          {/* Demo hint */}
          <div className="flex flex-col gap-2 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl px-4 py-3 mb-6">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <div className="text-indigo-700 dark:text-indigo-300 text-xs">
                <p>HR: <span className="font-semibold">admin@hrms.com</span> / <span className="font-semibold">admin123</span></p>
                <p className="mt-1">Employee: <span className="font-semibold">emp@hrms.com</span> / <span className="font-semibold">emp123</span></p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address or Employee ID</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={form.identifier}
                  onChange={e => setForm(f => ({ ...f, identifier: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
                  placeholder="admin@hrms.com or EMP-1234"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 dark:focus:ring-indigo-900/30 transition-all"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                  className="w-4 h-4 rounded accent-indigo-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium transition-colors">
                Forgot password?
              </button>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity:0, x:-8 }}
                animate={{ opacity:1, x:0 }}
                className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:shadow-xl hover:shadow-indigo-200/60 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
              ) : (
                <> Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <Link to="/" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline transition-colors">
                Register here
              </Link>
            </p>
          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            © 2026 HRMS · Secure HR Management Platform
          </p>
        </motion.div>
      </div>
    </div>
  );
}
