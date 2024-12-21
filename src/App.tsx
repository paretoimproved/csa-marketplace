import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { FarmDashboard } from './pages/FarmDashboard';
import { EmailVerificationSuccess } from './pages/EmailVerificationSuccess';
import { EmailVerificationError } from './pages/EmailVerificationError';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-success" element={<EmailVerificationSuccess />} />
        <Route path="/verify-error" element={<EmailVerificationError />} />
        <Route 
          path="/farm-dashboard" 
          element={
            <ProtectedRoute role="FARMER">
              <FarmDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              {({ user }) => (
                <Navigate 
                  to={user?.role === 'FARMER' ? '/farm-dashboard' : '/customer-dashboard'} 
                  replace 
                />
              )}
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;