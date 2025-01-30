import { NavLink } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import "../Dashboard/Sidebar.css"
import { useSelector } from "react-redux";

const Sidebar = () =>{

    const username = useSelector((state)=>state.Profile.username)
    const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)

    const links = [
        {icons:<DashboardIcon/>, to:"/dashboard", text:"Dashboard", restricted:true},
        {icons:<FeedIcon/>, to:"/myapplications", text:"My applications", restricted:true},
        {icons:<ChecklistOutlinedIcon/>, to:"/eligible-schemes", text:"Eligible Schemes", restricted:false},
        {icons:<PersonIcon/>, to:"/profile", text:"Profile", restricted:false},
    ]
    
    return (
        <>
        <nav id="navigation">
        <h3 style={{color:"white", whiteSpace:'nowrap', overflow:"hidden", textOverflow:'ellipsis', margin:'1rem', maxWidth:"200px"}}>Welcome {username}</h3>
        {
            links.map((link)=>{
                return (
                        <NavLink 
                         style={{pointerEvents:link.restricted && !isProfileCompleted ? 'none' : 'auto',
                         opacity : link.restricted && !isProfileCompleted ? 0.5 : 1}}
                         className="link" to={link.to}>{link.icons}{link.text}</NavLink>
                )
            })
        }
        </nav>
        </>
    )
}
export default Sidebar;