// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B9B9B',
    },
    secondary: {
        main: '#060A00',
      
    },
    third: {
        main: '#045361',
      },
      background: {
        default: '#696969', // Add a background color here
      },
    
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;
