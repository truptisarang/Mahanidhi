import { Navigate, Outlet } from "react-router-dom";
import "../Dashboard/Dashboard.css"
import OfficerSidebar from "./OfficerSidebar";
import { useSelector } from "react-redux";

const OfficerLayout = () =>{
    const isLoggedIn = useSelector((state)=>state.Officer.isLoggedIn)
    
    return (
      <>
        <div id="dashboard_container">
          <div id="sidebar">
            <OfficerSidebar />
          </div>
          <div id="main_content">
            {isLoggedIn ? <Outlet/> : <Navigate to="/officer-login"/>}
          </div>
        </div>
      </>
    );
}

export default OfficerLayout;