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
import EligibleSchemes from './Components/EligibleSchemes/EligibleSchemes';
import OfficerSidebar from './Components/Admin/OfficerSidebar';
import OfficerLayout from './Components/Admin/OfficerLayout';
import ScrutinisedApp from './Components/Admin/ScrutinisedApp';
import Notifications from './Components/Dashboard/Notifications/Notifications';

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
            <Route path='/login' element={<Login props=""/>}/>
            <Route path='/dashboard' element={<Layout><Dashboard/></Layout>}/>
            <Route path='/profile' element={<Layout><Profile/></Layout>}/>
            <Route path='/myapplications' element={<Layout><MyApplications/></Layout>}/>
            <Route path='/notifications' element={<Layout><Notifications/></Layout>}/>
            <Route path='/eligible-schemes' element={<Layout><EligibleSchemes/></Layout>}/>
            <Route path='/eligible-schemes/post-matric-sbc-eligibility-criteria' element={<Layout><Post_mat_SBC/></Layout>}/>
            <Route path='/eligible-schemes/post-matric-vjnt-eligibility-criteria' element={<Layout><Post_mat_VJNT/></Layout>}/>
            <Route path='/eligible-schemes/post-matric-obc-eligibility-criteria' element={<Layout><Post_mat_OBC/></Layout>}/>
            <Route path='/post-matric-sbc-form' element={<Layout><SchemeForm schemeName="Post Matric Scholarship to SBC students" deptName="OBC, SEBC, VJNT & SBC Welfare Department"/></Layout>}/>
            <Route path='/post-matric-obc-form' element={<Layout><SchemeForm schemeName="Post Matric Scholarship to OBC students" deptName="OBC, SEBC, VJNT & SBC Welfare Department"/></Layout>}/>
            <Route path='/post-matric-vjnt-form' element={<Layout><SchemeForm schemeName="Post Matric Scholarship to VJNT students" deptName="OBC, SEBC, VJNT & SBC Welfare Department"/></Layout>                                                       }/>
            <Route path='/officer-login' element={<AdminLogin title="Officer"/>}/>
            <Route path='/admin-dashboard' element={<AdminDashboard/>}/>
            <Route path='/officer-dashboard' element={<OfficerLayout><OfficerDashboard/></OfficerLayout>}/>
            <Route path='/scrutinised-applications' element={<OfficerLayout><ScrutinisedApp/></OfficerLayout>}/>
            <Route path='*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
