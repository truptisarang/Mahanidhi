import { CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";

const DCard = (props) =>{
    return (
        <>
            <Card sx={{width:250, minWidth:200, backgroundColor:props.color}}>
                <CardContent>
                    <Typography color={"grey"}>
                       {props.title}
                    </Typography>
                    <Typography variant="h3">
                        {props.value}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default DCard;