import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, Mail, Lock, User, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Landing() {
  const navigate = useNavigate();
  const { user, register } = useAuth();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Employee');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    register(email, password, role);
    if (role === 'Employee') {
      navigate('/emp/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative circles to match dashboard vibe */}
      <div className="absolute -left-8 -top-8 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute right-16 -bottom-10 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute right-0 top-0 w-48 h-48 bg-violet-500/30 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />

      <AnimatePresence mode="wait">
        {!isRegistering ? (
          <motion.div
            key="landing-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="z-10 flex flex-col items-center text-center px-6 max-w-4xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 mb-8 shadow-xl"
            >
              <Briefcase className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              We value your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-white">skills</span> <br className="hidden md:block" /> rather than resume.
            </h1>
            
            <p className="text-lg md:text-xl text-indigo-100/90 mb-10 max-w-2xl font-medium">
              Empowering organizations to discover, nurture, and manage top talent through skill-based insights and intuitive human resource management.
            </p>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsRegistering(true)}
                className="group relative inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Register
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="group relative inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                Log In
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="register-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4 }}
            className="z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-md p-8 relative"
          >
            <button 
              onClick={() => setIsRegistering(false)} 
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
              <p className="text-sm text-indigo-100 mt-2 font-medium">Join us to discover top talent.</p>
            </div>
            
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-200" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email ID" 
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200/70 focus:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                    required
                  />
                </div>
              </div>
              
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-200" />
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200/70 focus:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                    required
                  />
                </div>
              </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-200" />
                      <input 
                        type="password" 
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter Password" 
                        className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-indigo-200/70 focus:bg-white/10 focus:ring-2 focus:ring-white/30 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setRole('HR')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-200 ${
                        role === 'HR' 
                          ? 'bg-white text-indigo-700 border-white shadow-lg' 
                          : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                      <span className="font-semibold text-sm">HR</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('Employee')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all duration-200 ${
                        role === 'Employee' 
                          ? 'bg-white text-indigo-700 border-white shadow-lg' 
                          : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="font-semibold text-sm">Employee</span>
                    </button>
                  </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-white text-indigo-700 hover:bg-indigo-50 font-bold py-3.5 rounded-xl shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Register Account'} 
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-indigo-200">
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => navigate('/login')} 
                    className="text-white font-semibold hover:underline"
                  >
                    Log In
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
