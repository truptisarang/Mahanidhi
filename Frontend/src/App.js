import './App.css';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Error from './Components/Error/Error';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile from './Components/Profile/Profile';
import Layout from './Components/Layout/Layout';
import MyApplications from './Components/MyApplications/MyApplications';
import Post_mat_SBC from './Components/EligibilityCriteria/Post_mat_SBC';
import Post_mat_VJNT from './Components/EligibilityCriteria/Post_mat_VJNT';
import Post_mat_OBC from './Components/EligibilityCriteria/Post_mat_OBC';
import SchemeForm from './Components/Forms/Form';
import AdminLogin from './Components/Admin/AdminLogin';
import AdminDashboard from './Components/Admin/AdminDashboard';
import OfficerDashboard from './Components/Admin/OfficerDashboard';

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
            <Route path='/' element={<Home/>}/>
            <Route path='/registration' element={<RegistrationForm />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Layout><Dashboard/></Layout>}/>
            <Route path='/profile' element={<Layout><Profile/></Layout>}/>
            <Route path='/myapplications' element={<Layout><MyApplications/></Layout>}/>
            <Route path='/post-matric-sbc-eligibility-criteria' element={<Post_mat_SBC/>}/>
            <Route path='/post-matric-vjnt-eligibility-criteria' element={<Post_mat_VJNT/>}/>
            <Route path='/post-matric-obc-eligibility-criteria' element={<Post_mat_OBC/>}/>
            <Route path='/post-matric-sbc-form' element={<SchemeForm caste="SBC"/>}/>
            <Route path='/post-matric-obc-form' element={<SchemeForm caste="OBC"/>}/>
            <Route path='/post-matric-vjnt-form' element={<SchemeForm caste="VJNT"/>}/>
            <Route path='/admin-login' element={<AdminLogin title="Admin"/>}/>
            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
            <Route path='/officer-dashboard' element={<OfficerDashboard/>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
