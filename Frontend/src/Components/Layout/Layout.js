import Sidebar from "../Dashboard/Sidebar";
import "../Dashboard/Dashboard.css"

const Layout = ({children}) =>{
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