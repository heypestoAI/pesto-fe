import { Box } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children, showSidebar = true }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      {showSidebar && <Sidebar />}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
          boxSizing: 'border-box'
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default Layout; 