import {ethers} from 'ethers';
import { useState } from 'react';
import Button from '@mui/material/Button';
import './WalletCreation.css'
import { TextField } from '@mui/material';

const WalletCreation = () =>{
    const [Wallet, setWallet] = useState(null);

    const generateWallet = () =>{
        const newWallet = ethers.Wallet.createRandom();
        if(newWallet){
            setWallet(newWallet)
        }
    }
    console.log(Wallet)
    return(
        <>
      <b id='warning'>WARNING !</b> 
      <div id='instructions'>
        <p>1. <b>Wallet Info</b>:  You’ll get a wallet address, mnemonic (secret or seed phrase), and private key in a file. Keep this file safe. Don’t store it online or share it.</p>
        <p>2. <b>Backup Your Secret Phrase</b>: Write down your mnemonic phrase on paper and keep it in a secure place. This is essential for recovering your account. If you lose this phrase, you will lose access to your funds.</p>
        <p>3. <b>Private key</b>: Private key is meant to be private. Do not share it with anyone.</p>
      </div>
      {Wallet == null && <Button variant="contained"  onClick={generateWallet}>Create Wallet</Button>}
        {Wallet &&  
        <div id='instructions'>
            <TextField id="outlined-basic" disabled color='secondary' fullWidth label="Wallet Address" variant="outlined" defaultValue={Wallet.address} />
        </div>
         }
        </>
    )
}

//  {
//     Wallet &&
//     <div>
      
//       <p><strong>Address:</strong> {Wallet.address}</p>
//       <p><strong>Private Key:</strong> {Wallet.privateKey}</p>
//       <p><strong>Mnemonic:</strong> {Wallet.mnemonic.phrase}</p>
//     </div>
//   }
export default WalletCreation;