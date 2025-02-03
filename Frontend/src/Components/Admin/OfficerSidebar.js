import { NavLink } from "react-router-dom"
import FeedIcon from '@mui/icons-material/Feed';
import "../Dashboard/Sidebar.css"
import { useSelector } from "react-redux";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const OfficerSidebar = () =>{

    const username = useSelector((state)=>state.Officer.fullName)
    // const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)

    const links = [
        {icons:<FeedIcon/>, to:"/officer-dashboard", text:"Pending Applications", restricted:true},
        {icons:<AssignmentTurnedInIcon/>, to:"/scrutinised-applications", text:"Scrutinised Applications", restricted:true},
    ]
    return (
        <>
        <nav id="navigation">
        <h3 style={{color:"white", whiteSpace:'nowrap', overflow:"hidden", textOverflow:'ellipsis', margin:'1rem', maxWidth:"200px"}}>Welcome {username}</h3>
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
export default OfficerSidebar;