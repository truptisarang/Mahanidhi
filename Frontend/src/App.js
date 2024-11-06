import './App.css';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';

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
      <BrowserRouter>
      <Navbar/>
        <Routes>
            <Route path='/registration' element={<RegistrationForm />}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
