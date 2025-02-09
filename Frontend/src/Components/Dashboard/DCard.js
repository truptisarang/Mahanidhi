import { CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const DCard = (props) =>{
    return (
        <>
            <Card sx={{width:300, minWidth:200, backgroundColor:props.color}}>
                <CardContent>
                    <AccountBalanceWalletIcon/>
                    <Typography variant="h3">
                        {props.balance}
                    </Typography>
                    <Typography color={"grey"}>
                       {/* {props.title || "Wallet Balance"} */}
                    </Typography>
                    <Typography variant="h6" color={"grey"}>
                        {props.walletAddr}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default DCard;