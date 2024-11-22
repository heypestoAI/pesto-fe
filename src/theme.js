import { createTheme } from '@mui/material';

export const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.07)'
        }
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 5,
          height: 10
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#00B517'
    },
    success: {
      main: '#00B517'
    }
  }
}); 