import './App.css';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    secondary:{
      main:'#0059ff'
    }
  },
  typography:{
    allVariants:{
      fontFamily:"Poppins"
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <RegistrationForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
