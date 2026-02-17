import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import TaskForm from './pages/TaskForm';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* User Routes */}
      <Route path="/user-dashboard" element={
        <ProtectedRoute allowedRoles={['user', 'admin']}> 
          {/* Admin can accessing user dashboard? Maybe not. Let's stick to strict separation or redirection. 
              If admin logs in, they go to admin-dashboard. If they try /user-dashboard, what happens?
              Usually admin is a super-user. But for this simple app, let's keep them separate as requested.
              AllowedRoles=['user'] for UserDashboard.
          */}
          <UserDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/task/new" element={
        <ProtectedRoute allowedRoles={['user', 'admin']}>
           <TaskForm />
        </ProtectedRoute>
      } />

      <Route path="/task/edit/:id" element={
        <ProtectedRoute allowedRoles={['user']}>
           <TaskForm />
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />

       <Route path="/admin/task/edit/:id" element={
        <ProtectedRoute allowedRoles={['admin']}>
           <TaskForm />
        </ProtectedRoute>
      } />

      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
