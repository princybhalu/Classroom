import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ViewAssignment from '../assignment/viewAssignment';
import ViewMaterial from '../material/viewMaterial';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import { GetAllUserByClassidApiCall } from '../services/classroomApis';
import CircularProgress from '@mui/material/CircularProgress';


function Peopleofclassroom(props) {

    const [ProfeserList, SetProfeserList] = useState([]);
    const [StudentList, SetStudentList] = useState([]);

    GetAllUserByClassidApiCall(props.classroom._id).then((result) => {
        console.log(result);
        SetProfeserList(result.data.proferserList);

        if (result.data.studentList.length !== 0) SetStudentList(result.data.studentList);
        else SetStudentList(-1);

    }).catch((err) => { console.log(err) });

    console.log(StudentList);

    return (
        <>
            <Box md={{ Width: '100%' }} sx={{ display: 'block', marginTop: '50px', marginLeft: '15%', marginRight: '15%' }} >

                {/* Professor */}
                <div>
                    <h2 style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>Professors</h2>
                    {ProfeserList.length !== 0 ? <>{ProfeserList.map((prof) => (<>
                        <div class="card" style={{ border: '0px solid' }}>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-1' style={{ paddingLeft: '20px' }}>

                                        <div className='profile-picture ' style={{backgroundColor: ThemeColorList.themecolorlist[prof.length % ImageUrlList.imageurl.length]  }}>  {prof ? prof[0] : 'P'} </div>

                                    </div>
                                    <div className='col-11' >
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography color="textPrimary" variant="h6" sx={{ fontSize: '20px', width: '500px' }}>{prof}</Typography>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div><hr />
                    </>))}
                    </> : <>
                        <Box sx={{ display: 'flex', marginLeft: '50%' }}>
                            <CircularProgress />
                        </Box>
                    </>}


                </div>

                <hr style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], width: '100%', borderTop: '4px solid' }} />

                {/* Students */}
                <div>
                    <h2 style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>Students</h2>
                    {StudentList.length !== 0 && StudentList !== -1 && <>{StudentList.map((student) => (<>
                        <div class="card" style={{ border: '0px solid' }}>
                            <div class="card-body">
                                <div className='row'>
                                    <div className='col-1' style={{ paddingLeft: '20px' }}>

                                        <div className='profile-picture' style={{backgroundColor: ThemeColorList.themecolorlist[student.length % ImageUrlList.imageurl.length]  }}>  {student ? student[0] : 'S'} </div>

                                    </div>
                                    <div className='col-11' >
                                        <Box sx={{ display: 'flex' }}>
                                            <Typography color="textPrimary" variant="h6" sx={{ fontSize: '20px', width: '500px' }}>{student}</Typography>
                                        </Box>
                                    </div>
                                </div>
                            </div>
                        </div><hr />
                    </>))}
                    </> }

                    {StudentList.length === 0 &&  <>
                        <Box sx={{ display: 'flex', marginLeft: '50%' }}>
                            <CircularProgress />
                        </Box>
                    </>}

                    {StudentList === -1 &&  <>
                       Yet Not Any Student Join
                    </>}

                </div>
            </Box>

        </>
    )
}

export default Peopleofclassroom;