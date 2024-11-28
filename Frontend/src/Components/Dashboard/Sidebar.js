import { NavLink } from "react-router-dom"
import "../Dashboard/Sidebar.css"
const Sidebar = () =>{
    const links = [
        {to:"/dashboard", text:"Dashboard"},
        {to:"/myapplications", text:"My applications"},
        {to:"/myapplications", text:"Notifications"},
        {to:"/profile", text:"Profile"},
    ]
    return (
        <>
        <nav id="navigation">
        <h3 style={{color:"white"}}>Welcome Trupti</h3>
        {
            links.map((link)=>{
                return (
                    <NavLink className="navlink" to={link.to}>{link.text}</NavLink>
                )
            })
        }
        </nav>
        </>
    )
}
export default Sidebar;