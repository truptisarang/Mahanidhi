import { NavLink } from "react-router-dom"
import FeedIcon from '@mui/icons-material/Feed';
import "../Dashboard/Sidebar.css"
import { useSelector } from "react-redux";

const OfficerSidebar = () =>{

    const username = useSelector((state)=>state.Profile.username)
    // const isProfileCompleted = useSelector((state)=>state.Profile.isProfileCompleted)

    const links = [
        {icons:<FeedIcon/>, to:"/officer-dashboard", text:"Pending", restricted:true},
        {icons:<FeedIcon/>, to:"/approved-applications", text:"Approved", restricted:true},
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