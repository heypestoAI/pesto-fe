import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Dashboard from './pages/DashboardPage';
import Products from './components/product/ProductDashboard';
import Chat from './components/chat/Chat';
import FileUploadPage from './pages/FileUploadPage';
import { ExcelDataProvider } from './contexts/ExcelDataContext';

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: '#00B517',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ExcelDataProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                
                    <Dashboard />
                 
                }
              />
              <Route
                path="/upload"
                element={
                
                    <FileUploadPage />
                 
                }
              />
              <Route path="/products" element={<Products />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ExcelDataProvider>
    </ThemeProvider>
  );
}

export default App;
