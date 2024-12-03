import { NavLink } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import "../Dashboard/Sidebar.css"
import { Box } from "@mui/material";
const Sidebar = () =>{
    const links = [
        {icons:<DashboardIcon/>, to:"/dashboard", text:"Dashboard"},
        {icons:<FeedIcon/>, to:"/myapplications", text:"My applications"},
        {icons:<NotificationsIcon/>,to:"/myapplications", text:"Notifications"},
        {icons:<PersonIcon/>, to:"/profile", text:"Profile"},
    ]
    return (
        <>
        <nav id="navigation">
        <h3 style={{color:"white"}}>Welcome Trupti</h3>
        {
            links.map((link)=>{
                return (
                        <NavLink className="link" to={link.to}>{link.icons}{link.text}</NavLink>
                )
            })
        }
        </nav>
        </>
    )
}
export default Sidebar;