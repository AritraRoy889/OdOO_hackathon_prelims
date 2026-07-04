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

  const login = async (identifier, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: identifier, password })
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        localStorage.setItem('hrms_user', JSON.stringify(data.data.user));
        localStorage.setItem('hrms_token', data.data.token);
        return { success: true, user: data.data.user };
      } else {
        return { success: false, error: data.message || 'Invalid email or password' };
      }
    } catch (err) {
      return { success: false, error: 'Network error. Make sure the backend is running.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_token');
  };

  const updateUser = (data) => {
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('hrms_user', JSON.stringify(updated));
  };

  const register = async (email, password, role) => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });
      const data = await response.json();
      
      if (data.success) {
        setUser(data.data.user);
        localStorage.setItem('hrms_user', JSON.stringify(data.data.user));
        localStorage.setItem('hrms_token', data.data.token);
        return { success: true };
      } else {
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, error: 'Network error. Make sure the backend is running.' };
    }
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
