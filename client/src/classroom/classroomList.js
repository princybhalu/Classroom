import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetClassroomListByUserIdApiCall } from '../services/classroomApis';
import { ListItemText, IconButton, ListItem, List, Box, Grid, Container, Link, MenuItem, FormHelperText, FormControl, InputLabel, Select } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ImageUrlList } from '../model/imageUrlList';
import { Button } from 'bootstrap';
import { useNavigate } from "react-router";

function ClassroomListByUserId() {

    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const [ClassroomList, SetClassroomList] = useState([]);
    const [LinkToClass_id, SetLinkToClass_id] = useState("");
    const [SelectedSem, SetSelectedSem] = useState(0);
    const [SelectBatch, SetSelectBatch] = useState(0);

    let year = new Date().getFullYear();
    var ListOfYear = [];
    for (let i = 2012; i < year + 5; i++) {
        ListOfYear.push(i);
    }

    GetClassroomListByUserIdApiCall(user._id).then((result) => {
        if (result.length === 0) SetClassroomList(-1);
        else {
            SetClassroomList(result);
        }
    }).catch((err) => { console.log(err) });

    const toNevigate = (id) => {
        navigate('/classroom/viewClassroom/' + id);
    }

    useEffect(() => {
        if (LinkToClass_id !== "") {
            toNevigate(LinkToClass_id);
        }
    }, [LinkToClass_id]);

    var html = "";
    if (ClassroomList.length !== 0 && ClassroomList !== -1) {
        for (let i = 0; i < ClassroomList.length; i++) {
            if (ClassroomList[i].Sem == SelectedSem || SelectedSem === 0) {
                if (SelectBatch == ClassroomList[i].Batch || SelectBatch == 0) {
                    html += ` <a href="/classroom/viewClassroom/${ClassroomList[i]._id}">
                    <div class="card bg-dark text-white">
                    <img class="card-img" src="${ImageUrlList.imageurl[ClassroomList[i].Classname.length % ImageUrlList.imageurl.length]}" alt="Card image">
                    <div class="card-img-overlay">
                        <h5 class="card-title">${ClassroomList[i].Classname}</h5>
                        <p class="card-text">${ClassroomList[i].Professor_name}</p>
                        <p class="card-text">${ClassroomList[i].Subtitle}</p>
                    </div>
                    </div></a><br />
                `;
                }

            }
        }
        if (html === "") {
           if(user.role == "Professor") html = `<center><div style="margin-left: 50px"> No Classroom Created. </div></center>`
           else html = `<center><div style="margin-left: 50px"> No Classroom Joined In This Semester. </div></center>`
        }
    }

    const handleChangeInBatch = (event) => {
        console.log("in event");
        SetSelectBatch(event.target.value);
    }

    return (
        <>
            <Box md={{ Width: '100%' }} sx={{ display: 'flex', flexGrow: 1, marginTop: '50px' }} >
                {
                    user.role !== "Admin" && <>

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {user.role === "Professor" && <> <Grid item xs={12} md={4}>
                                <FormControl sx={{ m: 1, minWidth: 275 }}>
                                    <InputLabel id="demo-simple-select-helper-label" >Batch Year </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        margin="normal"
                                        id="demo-simple-select-helper"
                                        label="Department"
                                        name="department"
                                        fullWidth
                                        variant="outlined"
                                        // input={<OutlinedInput label="Tag" />}
                                        onChange={handleChangeInBatch}
                                    >
                                        {ListOfYear.map((name) => (
                                            <MenuItem
                                                key={name}
                                                value={name}

                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            </Grid>

                            </>}
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
                                <ListItem
                                    key={value}
                                    disableGutters
                                >
                                    <ListItemText  >

                                        <button className={value == SelectedSem ? "list-group-item active" : "list-group-item"} onClick={() => { SetSelectedSem(value); }}  >
                                            &nbsp;&nbsp;&nbsp; Semester {value}
                                        </button>

                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List></>
                }
                <Container>
                    {ClassroomList.length === 0 && ClassroomList !== -1 ? <>
                        <Box sx={{ display: 'flex', marginLeft: '25%' }}>
                            <CircularProgress />
                        </Box>
                    </> : <>
                        <Grid container spacing={2} sx={{ marginLeft: '-80px' }}>

                            <div dangerouslySetInnerHTML={createMarkup(html)} />


                        </Grid>
                    </>}

                    {ClassroomList === -1 ? <><h6>There Is No Classroom Joined</h6></> : <></>}

                </Container>
            </Box>



        </>
    )
}

export default ClassroomListByUserId;


function createMarkup(html1) {
    return { __html: html1 };
}

 // <Grid item xs={12} md={4} >
                                //     {/* <Link href="/classroom/viewClassroom/' + classroom._id +'"> */}
                                //     <Card sx={{ maxWidth: 400 }}>
                                //         <CardActionArea>
                                //             <CardMedia
                                //                 component="img"
                                //                 height="140"
                                //                 image={ImageUrlList.imageurl[classroom.Classname.length % ImageUrlList.imageurl.length]}
                                //                 alt="green iguana"
                                //             />
                                //             <CardContent>

                                //                 <Typography gutterBottom variant="h5" component="div">
                                //                     {classroom.Classname}
                                //                 </Typography>

                                //                 <Typography variant="body" color="text.secondary">
                                //                     {classroom.Professor_name}
                                //                 </Typography>
                                //                 <Typography variant="body2" color="text.secondary">
                                //                     {classroom.Subtitle !== "" ? <>{classroom.Subtitle}</> : <><br /></>}
                                //                 </Typography>
                                //                 <Button onClick={navigate('/classroom/viewClassroom/' + classroom._id)}> View </Button>
                                //             </CardContent>
                                //         </CardActionArea>
                                //     </Card>

                                // </Grid>