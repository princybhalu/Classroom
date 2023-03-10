import React, { useState } from 'react';
import { Box, Button, FormHelperText, Link, Grid, TextField, Typography, InputLabel, FormControl, Select, MenuItem, Modal } from '@mui/material';
import { useNavigate } from "react-router";
import { RoleName } from '../model/RoleName';
import "../css/user/updateuser.css";
import { useSelector } from 'react-redux';
import '../css/user/profile-picture.css';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderTop: '10px solid #000',
  boxShadow: 24,
  p: 4
};

function Profile() {

  const user = useSelector(state => state.user);

  return (
    <>
      <Modal open={1} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className="popup-model">

          <Grid container spacing={2}>

            <Grid item xs={12} md={6} className="logo-div" >
              <div className='profile-logo'>  {user.name ? user.name[0] : 'C'} </div>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h6" className='Header' > {user.name} </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2" > {user.role} </Typography>
              </Box>

              <Link href="/">Back To Home</Link>
            </Grid>

            <Grid item xs={12} md={6} >
              User Id : {user.userId} <hr />
              Email : {user.email} <hr />
              Date Of Birth : {user.dob} <hr />
              {user.role === RoleName.STUDENT && <>Batch : {user.batch}<br /></>} 
              {user.role === RoleName.PROFESSOR && <>Experience : {user.batch}<br /></>}
              {user.role === RoleName.ADMIN && <>Experience : {user.batch}<br /></>}
               
            </Grid>

            

          </Grid> 

        </Box>
      </Modal>
    </>
  )
}

export default Profile;
