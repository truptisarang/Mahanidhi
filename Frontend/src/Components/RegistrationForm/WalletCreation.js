import {ethers} from 'ethers';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import './WalletCreation.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import axios from "axios";

const WalletCreation = (props) =>{

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
    const generateWallet = () =>{
        const newWallet = ethers.Wallet.createRandom();
        if(newWallet){
            setWallet(newWallet)
            const WalletFile = `Wallet Info\nWallet address: ${newWallet?.address}\nPrivate key:${newWallet?.privateKey}\nSeed phrase/Mnemonic:${newWallet?.mnemonic.phrase}`;
            const blob = new Blob([WalletFile], { type: "text/plain" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "wallet-info.txt";
            link.click();
            const response = axios.post("http://localhost:5000/storePersonalDetails",{creds:Creds, pd:personal_details})
            goToNext();
        }
    }

    const handleBack = () =>{
      setActiveStep(activeStep  - 1);
   }
       
    return(
        <>
      <b id='warning'>WARNING !</b> 
      <div id='instructions'>
        <p>1. <b>Wallet Info</b>:  You’ll get a wallet address, mnemonic (secret or seed phrase), and private key in a file. Keep this file safe. Don’t store it online or share it.</p>
        <p>2. <b>Backup Your Secret Phrase</b>: Write down your mnemonic phrase on paper and keep it in a secure place. This is essential for recovering your account. If you lose this phrase, you will lose access to your funds.</p>
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