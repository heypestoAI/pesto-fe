import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import FileUpload from './components/upload/FileUpload';
import ProductDashboard from './components/product/ProductDashboard';
import Chat from './components/chat/Chat';
import PrivateRoute from './components/auth/PrivateRoute';

const theme = createTheme({
  // Customize your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/upload" element={<FileUpload />} />
                      <Route path="/products" element={<ProductDashboard />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/"
              element={
                  <Layout>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/upload" element={<FileUpload />} />
                      <Route path="/products" element={<ProductDashboard />} />
                      <Route path="/chat" element={<Chat />} />
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
