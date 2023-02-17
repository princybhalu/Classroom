import axios from 'axios';
import { useEffect, useState , useMemo} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField } from '@mui/material';
import {GetAllClassroomApiCall , DeleteClassApiCall} from '../service/classroomApi';


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

function ViewClass(){

    const [classRoom,SetClassRoom] = useState([]);
    const [deleteClass,SetDeleteClass] = useState({});
    const [open, setOpen] = useState(false);
    const [isDisableDeleteBtn, SetisDisableDeleteBtn] = useState(1);

    const user = useSelector(state => state.user); 

    const navigate = useNavigate();

    const handleOpen = () => setOpen(true);

    const handleChange = (event) =>{
        if (event.target.value === deleteClass.Classname) {
            SetisDisableDeleteBtn(0);
        } else {
            SetisDisableDeleteBtn(1);
        }
    }

    const DeleteClassIdCall = async (class1) => {
        console.log('Delete Class Id');

        try{
                console.log(class1._id);
                console.log(user);
                const res = await DeleteClassApiCall(class1._id,user);
    
                if (res.status === 200) {
                    toast.success(res.data);
                    console.log(res.data);
                    SetDeleteClass({});
                    setOpen(false);
                    SetisDisableDeleteBtn(1);
                    navigate('/classroom/viewClass');
                }

        }catch(err){
            console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }
    }
    
    GetAllClassroomApiCall(user).then((result) => {
        SetClassRoom(result)
        console.log(classRoom);           
    });



    return(
        <>
            <div>List Of Class</div>
            <div>{!classRoom && 'loading...'}</div>
            <table>
                <thead>
                    <th>ClassName</th>
                    <th>Sem</th>
                </thead>
                <tbody>
                {
                    classRoom.map((classes) => (<>
                        {classes.ClassActiveStatus === true && <> 
                            <tr>
                                <td>{classes.Classname}</td>
                                <td>{classes.Sem}</td>
                                <td></td>
                                <td>
                                    <Button onClick={() => { navigate('/classroom/updateClass/' + classes._id) }} variant="contained" sx={{ marginRight: '5px' }}>
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick={() => { SetDeleteClass(classes); handleOpen(); }} variant="contained" color='error' sx={{ marginRight: '5px' }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        
                        
                        </>
                        }
                    </>))
                    
                }
                </tbody>
            </table>
            <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description" open={open}
            closeAfterTransition BackdropComponent={Backdrop}
            BackdropProps={{ timeout: 500, }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Drop Classroom
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>

                        To drop the Class <b>{deleteClass.Classname}</b>, type the Classname to confirm.
                        <br />

                        <TextField
                            // error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth
                            label="Enter Classname"
                            margin="normal"
                            name="Classname"
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <br />

                        <Button onClick={() => { DeleteClassIdCall(deleteClass); }} variant="contained" color='error' disabled={isDisableDeleteBtn} sx={{ marginRight: '5px' }}>
                            Delete
                        </Button>
                        <Button onClick={() => { SetDeleteClass({}); setOpen(false); SetisDisableDeleteBtn(1); }} variant="contained"  sx={{ color: '#fafafa' }}>
                            Cancle
                        </Button>

                    </Typography>
                </Box>
            </Fade>
        </Modal>
        </>
    )
}

export default ViewClass;

