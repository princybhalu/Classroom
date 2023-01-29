import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AllUserApiCall } from '../services/userApis';
import { Link } from 'react-router-dom';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField } from '@mui/material';
import { useNavigate } from "react-router";
import { DeleteUserApiCall } from '../services/userApis';
import { toast } from 'react-toastify';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function allUser() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [AllUser, SetAllUser] = useState([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [deleteUser, SetDeleteUser] = useState({});
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

    const handleOpen = () => setOpen(true);

    const handleChange = (event) => {
        if (event.target.value === deleteUser.userId) {
            SetisDisableDeleteBtn(0);
        } else {
            SetisDisableDeleteBtn(1);
        }
    }

    const DeleteUserIdCall = async (user) => {
        console.log('deleted user');

        try {
            const res = await DeleteUserApiCall(user._id, user);

            if (res.status === 200) {
                toast.success(res.data);
                console.log(res.data);
                SetDeleteUser({});
                setOpen(false);
                SetisDisableDeleteBtn(1);
                navigate('/auth/allUser');
            }
        } catch (err) {

            console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }


    }


    AllUserApiCall().then((result) => { SetAllUser(result); }).catch((err) => { console.log(err) });

    return (<>
        <div>allUser</div>

        <table>
            <thead>
                <th>UserId</th>
                <th>Name </th>
                <th>Email </th>
                <th>Batch </th>
                <th>Department </th>
                <th></th>
                <th></th>
                <th></th>
            </thead>
            <tbody>
                {AllUser.map(user => <>
                    {/* <Link to={'/auth/update/' + user._id} > */}
                    { user.activestatus === true &&  <>
                    <tr>
                        <td>{user.userId}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.batch}</td>
                        <td>{user.department}</td>
                        <td></td>
                        <td>
                            <Button onClick={() => { navigate('/auth/update/' + user._id) }} variant="contained" sx={{ marginRight: '5px' }}>
                                Edit
                            </Button>
                        </td>
                        <td>
                            <Button onClick={() => { SetDeleteUser(user); handleOpen(); }} variant="contained" color='error' sx={{ marginRight: '5px' }}>
                                Delete
                            </Button>
                        </td>
                    </tr></> }
                    {/* </Link> */}

                </>)}
            </tbody>
        </table>

        <br />

        <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open}
            closeAfterTransition BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Drop User
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        To drop the User <b>{deleteUser.userId}</b>, type the UserId to confirm.
                        <br />

                        <TextField
                            // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth
                            label="Enter UserId"
                            margin="normal"
                            name="userId"
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <br />

                        <Button onClick={() => { DeleteUserIdCall(deleteUser); }} variant="contained" color='error' disabled={isDisableDeleteBtn} sx={{ marginRight: '5px' }}>
                            Delete
                        </Button>
                        <Button onClick={() => { SetDeleteUser({}); setOpen(false); SetisDisableDeleteBtn(1); }} variant="contained"  sx={{ color: '#fafafa' }}>
                            Cancle
                        </Button>

                    </Typography>
                </Box>
            </Fade>
        </Modal>
    </>
    )
}

export default allUser;
