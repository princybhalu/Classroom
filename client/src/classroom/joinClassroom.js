/* eslint-disable no-undef */
import React, { useState } from 'react';
import Navbar from '../components/dashboard/navbar';
import { Box, Button, Container, Typography, TextField } from '@mui/material';
import '../css/classroom.css';
import { width } from '@mui/system';

function JoinClassroom() {

    const [disableBtn, SetdisableBtn] = useState(true);
    const [InputAsClassCode , SetInputAsClassCode ] = useState();

    const handleChange = (event) => {
        if (event.target.value.length === 6) {
            SetdisableBtn(false);
            SetInputAsClassCode(event.target.value);
        } else {
            SetdisableBtn(true);
        }
    }

    const OnSubmit = () => {
        // const requestBody = {
        //     user_id : 
        // }
    }

    return (
        <>
            <Navbar activeLink='Join Class' />
            <div className='block-of-input'>
                <Box sx={{ my: 3 }}>
                    <Typography color="textPrimary" variant="h6" > Class Code </Typography>
                    <Typography color="textPrimary" variant="body" > Ask your teacher for the class code, then enter it here. </Typography>
                </Box>

                {/* User Id */}
                <TextField
                    label="Class Code"
                    margin="normal"
                    name="Class Code"
                    onChange={handleChange}
                    variant="outlined"
                    style={{width: '250px'}}
                />

                <br />

                <Button onClick={() => { OnSubmit(); }} variant="contained" color='primary' disabled={disableBtn} >
                    Join
                </Button>

            </div>

            <Box sx={{ my: 3 , marginLeft: '35%' }}>
                <Typography color="textPrimary" variant="body" > To sign in with a class code </Typography>
                <ul>
                    <li>Use an authorised account</li>
                    <li>Use a class code with 5-7 letters or numbers, and no spaces or symbols</li>
                </ul>
                {/* <Typography color="textPrimary" variant="body2" > Ask your teacher for the class code, then enter it here. </Typography> */}
            </Box>


        </>
    )
}

export default JoinClassroom;
