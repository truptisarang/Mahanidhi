import { useEffect, useState } from "react";
import "../Dashboard/Dashboard.css";
import DCard from "./DCard";
import axios from "axios";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const aadhaar = useSelector((state) => state.Profile.aadhaar);

  console.log(backend_url);
  const [Balance, setBalance] = useState(0);
  const [Address, setAddress] = useState("");

  const getWallet = async () => {
    const response = await axios.post(`${backend_url}/getPersonalDetails`, {
      Aadhaar: aadhaar,
    });
    console.log("Response: wallet", response);
    const walletAddr = response.data.data["WalletAddress"];
    setAddress(walletAddr);
    return walletAddr;
  };

  const getUSDCBalance = async (Address) => {
    const response = await axios.post(`${backend_url}/getUSDCBalance`, {
      walletAddress: Address,
    });
    console.log("Balance:",response)
    if (response.data.success) {
      setBalance(response.data.data);
    }
  };

  useEffect(() => {
   const fetchWalletBalance = async() =>{
    const walletAddress = await getWallet();
    console.log(walletAddress)
    if(walletAddress){
        getUSDCBalance(walletAddress)        
    }
   }
   fetchWalletBalance();
  }, []);

 

  const truncateAddress = (Address) => {
    if (!Address) {
      return "";
    } else {
      return `${Address.slice(0, 6)}.......${Address.slice(-4)}`;
    }
  };

  return (
    <>
      <div id="main_content">
        <h3>Dashboard</h3>
        <div id="dashboard_cards">
          <DCard
            balance={`${Balance} USDC`}
            walletAddr={truncateAddress(Address)}
            color="#FFF6E3"
          />
          {/* <DCard title="Schemes applied" value="2" color="#F3F3E0"/>
                    <DCard title="Applications under review" value="1" color="#FDFD96"/>
                    <DCard title="Application approved" value="1" color="#77DD77"/> */}
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Dashboard;
