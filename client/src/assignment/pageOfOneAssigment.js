import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';
import { Box, Toolbar, AppBar, Typography, Menu, Container, Button, Tooltip, MenuItem, Stack } from '@mui/material';
import Navbarofclassroom from '../components/navbarofclassroom';
import '../css/classroom.css';
import ArticleIcon from '@mui/icons-material/Article';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import { GetOneAssignmentApiCall } from '../services/assignmentApis';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router";
import { DeleteMatrialApiCall } from '../services/materialApis';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { RoleName } from '../model/RoleName';
import { DeleteAssignmentApiCall } from "../services/assignmentApis";
import AssignmentIcon from '@mui/icons-material/Assignment';
import StudentUploadAssignment from '../assignment/studentUploadAssignment';
import ViewStudentUploadAssignment from '../assignment/viewStudentUploadAssignment';

const settings = ['Update', 'Delete'];


function PageOfOneAssigment(props) {

    let { AssignmentId, Classname } = useParams();
    let Classroom = {
        Classname: Classname
    }

    const [Assignment, SetAssignment] = useState();
    const [IsSetAssignment, SetIsSetAssignment] = useState(0);

    const user = useSelector(state => state.user);


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    GetOneAssignmentApiCall(AssignmentId).then((result) => { SetAssignment(result); SetIsSetAssignment(1); }).catch((err) => { console.log(err) });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElNav, setAnchorElNav] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const DeleteAssignmentCall = async (id) => {
        console.log("delete Assignment");
        console.log(id);

        try {
            const requestBody = {
                user_Id: user._id,
            };
            console.log(requestBody);

            const res = await DeleteAssignmentApiCall(id, requestBody);

            if (res.status === 200) {
                toast.success(res.data);
                console.log(res.data);
                // navigate('/classroom/viewClassroom/:class_id');
            }
        } catch (err) {
            // console.log(err.res.status);
            toast.error(err.message);
            console.log(err.message);
        }
    };

    return (
        <>
            {/* Nav Bar */}
            <Navbarofclassroom classroom={Classroom} activeLink={"null"} SetOpenWhichComponentCallBack={"null"} />

            {/* Display Box Of Material */}
            {IsSetAssignment === 1 ? <><Box className="material-box-in-one-material-page" sx={{ display: 'flex', flexGrow: 1 }}>
                <div className='row' style={{ width: '75%' }}>
                    {/* Logo Of Material */}
                    <div className='col-1' style={{ marginTop: '20px' }}>
                        <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%', width: '50px', height: '50px' }}>
                            <AssignmentIcon sx={{ fontSize: '33px', color: 'white', verticalAlign: 'middle', marginTop: '9px', marginLeft: '9px' }} />
                        </div>
                    </div>
                    {/* Material Display Part */}
                    <div className='col-10' style={{ marginLeft: '40px' }}>
                        <div className='main-title-of-material'>

                            <Box sx={{ display: 'flex' }}>
                                <h2 style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }}>{Assignment.assignmentObject.Title}</h2>
                                {/* Update & Delete  */}
                                {user.role === RoleName.PROFESSOR && <>  <Stack direction="row" justifyContent="end" sx={{ marginLeft: '110%' }}>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Edit Assignment">
                                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                                <MoreVertIcon sx={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }} />
                                            </IconButton>
                                        </Tooltip>
                                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                                            {settings.map((setting) => (
                                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                    <Typography textAlign="center">
                                                        {setting === 'Update' && <> <Button onClick={() => navigate('/assignment/updateAssignment/' + Assignment.assignmentObject._id)} className="dropdown-item" sx={{ color: 'black' }}> {setting}</Button></>}
                                                        {setting === 'Delete' && <> <Button onClick={() => DeleteAssignmentCall(Assignment.assignmentObject._id)} className="dropdown-item" sx={{ color: 'black' }}> {setting}</Button>
                                                        </>}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Box>
                                </Stack>
                                </>}
                            </Box>

                            <Box sx={{ display: 'flex', width: '130%' }}>
                                <Typography color="textPrimary" variant="h6" sx={{ fontSize: '20px' }}>{Assignment.assignmentObject.Points} Points</Typography>
                                <Stack direction="row" justifyContent="end" sx={{ marginLeft: '80%' }}>
                                    <span className='title-of-material-of-date' sx={{ fontSize: '18px', verticalAlign: 'middle' }} style={{ marginTop: '12px' }}>Due Date {Assignment.DueDate}</span>
                                </Stack>
                            </Box>

                            <div style={{ color: 'rgb(74, 73, 73)' }}>{Assignment.proferserName} : {Assignment.createDate} {Assignment.updateDate !== null && <>(Edited At {Assignment.updateDate})</>}</div>
                        </div>
                        <hr style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length], width: '900px', borderTop: '3px solid ' }} />

                        <div>{Assignment.assignmentObject.Instructions}</div>

                        <br />

                        {Assignment.assignmentObject.Attach !== undefined && <><a href={Assignment.assignmentObject.Attach} target="_blank" rel="noopener noreferrer">
                            <img src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${Assignment.assignmentObject.Attach}#page=1`} style={{ border: '1px solid black', width: '250px', height: '250px' }} alt="PDF Front Page" />
                        </a></>}

                        <hr style={{ width: '900px' }} />

                        {user.role === RoleName.STUDENT && <>
                            <div className="card" style={{ width: '150%' }} >
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }}>Your Work</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Submit Your Assigment Here</h6>
                                    <StudentUploadAssignment AssignmentId={Assignment.assignmentObject._id} />
                                  
                                </div>
                            </div>

                        </>}

                        {user.role === RoleName.PROFESSOR && <>
                            <div className="card" style={{ width: '120%' }} >
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }}>View Submission</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Check Student Submission</h6>
                                    <ViewStudentUploadAssignment AssignmentId={Assignment.assignmentObject._id} />
                                </div>
                            </div>
                        </>}

                        <br />
                        <br />
                    </div>

                </div>
            </Box>
            </> : <><Box sx={{ display: 'flex', marginLeft: '50%', marginTop: '60px' }}>
                <CircularProgress />
            </Box></>
            }

        </>

    )
}

export default PageOfOneAssigment;