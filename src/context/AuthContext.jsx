import { createContext, useContext, useState, useEffect } from 'react';
import { currentUser as defaultUser } from '../data/sampleData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('hrms_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // 1. Check Simulated DB for registered users
    const existingUsers = JSON.parse(localStorage.getItem('hrms_users_db') || '[]');
    const foundUser = existingUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      // Auto-patch missing employee ID for legacy registrations
      if (foundUser.role === 'Employee' && !foundUser.employeeId) {
        foundUser.employeeId = `EMP-${Math.floor(1000 + Math.random() * 9000)}`;
        localStorage.setItem('hrms_users_db', JSON.stringify(existingUsers));
      }
      const userData = { ...defaultUser, email, name: foundUser.name, role: foundUser.role, employeeId: foundUser.employeeId };
      setUser(userData);
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }

    // 2. Fallback to Demo credentials
    if (email === 'admin@hrms.com' && password === 'admin123') {
      const userData = { ...defaultUser, email, role: 'HR' };
      setUser(userData);
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    if (email === 'emp@hrms.com' && password === 'emp123') {
      const userData = { ...defaultUser, email, name: 'Employee Demo', role: 'Employee', employeeId: 'EMP-1234' };
      setUser(userData);
      localStorage.setItem('hrms_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('hrms_user', JSON.stringify(updated));
  };

  const register = (email, password, role) => {
    // Save to simulated DB
    const existingUsers = JSON.parse(localStorage.getItem('hrms_users_db') || '[]');
    if (existingUsers.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const employeeId = role === 'Employee' ? `EMP-${Math.floor(1000 + Math.random() * 9000)}` : null;
    const newUser = { email, password, role, name: email.split('@')[0], employeeId };
    existingUsers.push(newUser);
    localStorage.setItem('hrms_users_db', JSON.stringify(existingUsers));

    // Automatically log them in
    const userData = { ...defaultUser, email, name: newUser.name, role, employeeId };
    setUser(userData);
    localStorage.setItem('hrms_user', JSON.stringify(userData));
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
