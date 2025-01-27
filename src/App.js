import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import { Login } from "./components/auth/Login";
import Dashboard from "./pages/DashboardPage";
import Products from "./pages/Products";
import ChatPage from "./pages/ChatPage";
import FileUploadPage from "./pages/FileUploadPage";
import IngredientsUpdatePage from "./pages/IngredientsUpdatePage";
import CostManagement from "./pages/CostManagement";
import { ExcelDataProvider, useExcelData } from "./contexts/ExcelDataContext";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/auth/PrivateRoute";

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#00B517",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ExcelDataProvider>
        <AuthProvider>
          <Router>
            <AppRoutes />
          </Router>
        </AuthProvider>
      </ExcelDataProvider>
    </ThemeProvider>
  );
}

// Separate component for routes where context is available
function AppRoutes() {
  const { excelData } = useExcelData();

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    const currentPath = window.location.pathname;

    // Allow access to upload page even without data
    if (currentPath === "/upload") {
      return children;
    }

    // Redirect to upload if no excel data
    if (!excelData || Object.keys(excelData).length === 0) {
      return <Navigate to="/upload" replace />;
    }

    return children;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <FileUploadPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/ingredient"
        element={
          <PrivateRoute>
            <IngredientsUpdatePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/cost-management"
        element={
          <PrivateRoute>
            <CostManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/products"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Navigate to="/dashboard" replace />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
