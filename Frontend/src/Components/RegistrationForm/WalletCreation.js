import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './WalletCreation.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const WalletCreation = (props) =>{
    const backend_url = process.env.REACT_APP_BACKEND_URL;
    useEffect(()=>{
      const uname = sessionStorage.getItem("Username")
      const passwd = sessionStorage.getItem("Password")
      const pd = JSON.parse(sessionStorage.getItem("PersonalDetails"))
      setCreds({...Creds,username:uname, password:passwd})
      setpersonal_details(pd)
    },[])
    
    const {activeStep, setActiveStep} = props.activeStep;
    const {completed, setCompleted} = props.completed;
    const [Wallet, setWallet] = useState(null);
    const [Creds, setCreds]=useState({username: "", password:""});
    const [personal_details, setpersonal_details]=useState({username: "", password:""});
    const goToNext = props.next;
    const generateWallet = async() =>{
        const newWallet = ethers.Wallet.createRandom();
        if(newWallet){
            const WalletFile = `Wallet Info\nWallet address: ${newWallet?.address}\nPrivate key:${newWallet?.privateKey}\nSecret recovery phrase/Mnemonic:${newWallet?.mnemonic.phrase}`;
            const blob = new Blob([WalletFile], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "wallet-info.txt";
            link.click();
            console.log(newWallet)
            const response = await axios.post(`${backend_url}/storePersonalDetails`,{creds:Creds, pd:personal_details, walletAddr:newWallet.address})
            if(response.data.success){
              toast.success(response.data.message)
              goToNext();
            }
        }
    }

    const handleBack = () =>{
      setActiveStep(activeStep  - 1);
   }
       
    return(
        <>
        <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
              />
      <b id='warning'>WARNING !</b> 
      <div id='instructions'>
        <p>1. <b>Wallet Info</b>:  You’ll get a wallet address, mnemonic (secret or seed phrase), and private key in a file. Keep this file safe. Don’t store it online or share it.</p>
        <p>2. <b>Backup Your secret recovery phrase</b>: Write down your secret recovery phrase on paper and keep it in a secure place. This is essential for recovering your account. If you lose this phrase, you will lose access to your funds.</p>
        <p>3. <b>Private key</b>: Private key is meant to be private. Do not share it with anyone.</p>
      </div>
      <div style={{display:'flex', gap:'1.5rem', justifyContent:'center'}}>
      <Button variant='contained'  startIcon={<NavigateBeforeIcon/>} onClick={handleBack}>Back</Button>
      {Wallet === null && <Button variant="contained"  onClick={generateWallet}>Create Wallet</Button>}
      </div>
        </>
    )
}

export default WalletCreation;
