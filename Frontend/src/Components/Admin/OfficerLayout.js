import "../Dashboard/Dashboard.css"
import OfficerSidebar from "./OfficerSidebar";

const OfficerLayout = ({children}) =>{
    return (
      <>
        <div id="dashboard_container">
          <div id="sidebar">
            <OfficerSidebar />
          </div>
          <div id="main_content">
            {children}
          </div>
        </div>
      </>
    );
}

export default OfficerLayout;