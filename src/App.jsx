import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import EmployeeLayout from './components/layout/EmployeeLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeProfile from './pages/employees/EmployeeProfile';
import Attendance from './pages/attendance/Attendance';
import LeaveManagement from './pages/leave/LeaveManagement';
import LeaveApproval from './pages/leave/LeaveApproval';
import Payroll from './pages/payroll/Payroll';
import AdminPanel from './pages/admin/AdminPanel';
import Reports from './pages/reports/Reports';
import Settings from './pages/settings/Settings';
import LoadingSpinner from './components/common/LoadingSpinner';
import Landing from './pages/Landing';

// Employee Portal Pages
import EmployeeDashboard from './pages/employee/EmployeeDashboard';
import MyAttendance from './pages/employee/MyAttendance';
import MyLeave from './pages/employee/MyLeave';
import MyPayroll from './pages/employee/MyPayroll';
import MyJobDetails from './pages/employee/MyJobDetails';
import MyDocuments from './pages/employee/MyDocuments';

function RoleRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={user.role === 'Employee' ? '/emp/dashboard' : '/dashboard'} replace />;
  }
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="lg" /></div>;
  if (user) {
    return <Navigate to={user.role === 'Employee' ? '/emp/dashboard' : '/dashboard'} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      
      {/* HR Routes */}
      <Route element={<RoleRoute allowedRoles={['HR', 'Admin']}><Layout /></RoleRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leave" element={<LeaveManagement />} />
        <Route path="/leave/approval" element={<LeaveApproval />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Employee Portal Routes */}
      <Route element={<RoleRoute allowedRoles={['Employee']}><EmployeeLayout /></RoleRoute>}>
        <Route path="/emp/dashboard" element={<EmployeeDashboard />} />
        <Route path="/emp/job-details" element={<MyJobDetails />} />
        <Route path="/emp/attendance" element={<MyAttendance />} />
        <Route path="/emp/leave" element={<MyLeave />} />
        <Route path="/emp/payroll" element={<MyPayroll />} />
        <Route path="/emp/documents" element={<MyDocuments />} />
        <Route path="/emp/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
