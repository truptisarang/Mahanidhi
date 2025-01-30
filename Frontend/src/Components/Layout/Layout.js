import Sidebar from "../Dashboard/Sidebar";
import "../Dashboard/Dashboard.css"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = ({children}) =>{
    const username = useSelector((state)=>state.Profile.username)
    const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)
    const navigate = useNavigate(); // For navigation in case of redirection

    if(!(username && isProfileCompleted)){
      navigate("/login")
    }
    return (
      <>
        <div id="dashboard_container">
          <div id="sidebar">
            <Sidebar />
          </div>
          <div id="main_content">
            {children}
          </div>
        </div>
      </>
    );
}

export default Layout;