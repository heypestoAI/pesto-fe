import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  styled
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Chat as ChatIcon,
  ShoppingCart as OrdersIcon,
  LocalShipping as ShipmentsIcon,
  Receipt as TransactionsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DRAWER_WIDTH = 240;

const StyledListItem = styled(ListItem)(({ theme, active, disabled }) => ({
  margin: '8px 16px',
  borderRadius: '8px',
  backgroundColor: active ? '#e8f5e9' : 'transparent',
  color: active ? '#00B517' : disabled ? '#ccc' : '#666',
  cursor: disabled ? 'not-allowed' : 'pointer',
  '&:hover': {
    backgroundColor: active ? '#e8f5e9' : disabled ? 'transparent' : '#f5f5f5',
  },
  '& .MuiListItemIcon-root': {
    color: active ? '#00B517' : disabled ? '#ccc' : '#666',
  },
}));

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Products', icon: <ProductsIcon />, path: '/products' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/orders', disabled: true },
    { text: 'Shipments', icon: <ShipmentsIcon />, path: '/shipments', disabled: true },
    { text: 'Transactions', icon: <TransactionsIcon />, path: '/transactions', disabled: true },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings', disabled: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid #eee',
          backgroundColor: 'white',
          top: "78px",
        },
      }}
    >
      <Box>
        <List>
          {menuItems.map((item) => (
            <StyledListItem
              button
              key={item.text}
              onClick={!item.disabled ? () => navigate(item.path) : undefined}
              disabled={item.disabled}
              active={location.pathname === item.path ? 1 : 0}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
          <StyledListItem
            button
            onClick={handleLogout}
            sx={{ mt: 2 }}
          >
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </StyledListItem>
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar; 