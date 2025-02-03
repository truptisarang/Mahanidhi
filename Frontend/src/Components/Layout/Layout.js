import Sidebar from "../Dashboard/Sidebar";
import "../Dashboard/Dashboard.css"
import { useSelector } from "react-redux";
import { Navigate, Outlet} from "react-router-dom";

const Layout = () =>{
    // const username = useSelector((state)=>state.Profile.username)
    // const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)
    const isLoggedIn = useSelector((state)=>state.Profile.isLoggedIn)


    // if(!(username && isProfileCompleted)){
    //   navigate("/login")
    // }
    return (
      <>
        <div id="dashboard_container">
          <div id="sidebar">
            <Sidebar />
          </div>
          <div id="main_content">
          {/* {children} */}
           {isLoggedIn ? <Outlet/>  : <Navigate to='/login'/>}
          </div>
        </div>
      </>
    );
}

export default Layout;