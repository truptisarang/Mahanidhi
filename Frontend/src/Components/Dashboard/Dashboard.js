import "../Dashboard/Dashboard.css"
import DCard from "./DCard";

const Dashboard = () =>{
    return(
        <>        
            <div id="main_content">
                <h3>Dashboard</h3>
                <div id="dashboard_cards">
                    <DCard title="  🪙Wallet Balance" value="$1203" color="#FFF6E3"/>
                    {/* <DCard title="Schemes applied" value="2" color="#F3F3E0"/>
                    <DCard title="Applications under review" value="1" color="#FDFD96"/>
                    <DCard title="Application approved" value="1" color="#77DD77"/> */}
                </div>
                <div>
                </div>
            </div>
        </>
    )

}

export default Dashboard;
