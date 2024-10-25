import { TextField, Grid, Box, Avatar} from '@mui/material';


const PersonalDetails = () =>{
    return (
      <>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item size={6}>
            <img src='https://placehold.co/200'></img>
          </Grid>

          <Grid item xs={6} container>
              <Grid item xs={12}>
                <TextField label="Full Name" fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="DOB" fullWidth disabled/>
              </Grid>
              <Grid item xs={12}>
                <TextField label="Gender" fullWidth disabled/>
              </Grid>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Address" fullWidth disabled/>
          </Grid>
           <Grid item xs={6}>
                <TextField label="Aadhaar Number" fullWidth disabled/>
           </Grid>
        </Grid>
       
      </>
    );
}

export default PersonalDetails;