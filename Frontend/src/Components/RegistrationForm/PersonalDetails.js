import { TextField, Grid, Avatar, IconButton} from '@mui/material';

import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const PersonalDetails = (props) =>{
    const [showPassword, setshowPassword] = useState(false)
    return (
      <>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item size={6}>
            <Avatar src={props.details.photo_url} sx={{height:200, width:200}}/>
          </Grid>

          <Grid item xs={6} container>
              <Grid item xs={12}>
                <TextField label="Full Name" value={props.details?.name} fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="DOB" value={props.details?.dob} fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Gender" value={props.details?.gender} fullWidth disabled/>
              </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Address" value={props.details?.address} fullWidth disabled/>
          </Grid>
           <Grid item xs={6}>
                <TextField label="Aadhaar Number" value={props.details?.aadhaarNumber} fullWidth disabled/>
           </Grid>
           <Grid item xs={6}>
                <TextField label="Username"  fullWidth />
           </Grid>
           <Grid item xs={6}>
                <TextField label="Password" fullWidth type={showPassword ? 'text' : 'password'} InputProps={{
              endAdornment: <InputAdornment position="end"><IconButton onClick={(e)=>{setshowPassword(!showPassword)}}>{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton></InputAdornment>,
          }}/>
           </Grid>
        </Grid>
      </>
    );
}

export default PersonalDetails;