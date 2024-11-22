import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  InputBase, 
  Box, 
  Avatar, 
  Menu, 
  MenuItem,
  Badge,
  styled
} from '@mui/material';
import { NotificationsOutlined, Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f5f5f5',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '400px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="default" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            color: '#00B517',
            marginRight: 3
          }}
        >
          PESTO
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{ 
            marginRight: 3,
            color: '#333'
          }}
        >
          Products
        </Typography>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search here..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <NotificationsOutlined />
          </Badge>
        </IconButton>

        <Box sx={{ ml: 2 }}>
          <IconButton onClick={handleMenu}>
            <Avatar src="/path-to-avatar.jpg" />
          </IconButton>
          <Typography
            variant="subtitle1"
            component="span"
            sx={{ ml: 1, color: '#333' }}
          >
            {user?.name || 'User'}
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{ color: '#666' }}
          >
            Founder
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 