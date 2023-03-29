import React, { useEffect } from "react";
import { useState } from "react";
import { viewAssignmentApiCall, SubmitAssignmentApiCall } from "../services/assignmentApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button, Grid, Box , Stack , Typography } from "@mui/material";
import { DeleteAssignmentApiCall } from "../services/assignmentApis";
import { useSelector } from "react-redux";
import { RoleName } from "../model/RoleName";
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleIcon from '@mui/icons-material/Article';
import AssignmentIcon from '@mui/icons-material/Assignment';
import '../css/classroom.css';

function ViewAssignment(props) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [AssignmentObject, SetAssignmentObject] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // const [file, fileChange] = useState();

  const user = useSelector((state) => state.user);

  const requestBody = {
    Classid: props.classroom._id,
  };


  viewAssignmentApiCall(requestBody).then((result) => { if (result.length === 0) SetAssignmentObject(-1); else SetAssignmentObject(result);  }).catch((err) => { console.error(err); });

  const NevigateToViewMaterial = (id) => {
    console.log("call in navigate");
    navigate("/assignment/viewOneAssignment/" + id + "/" + props.classroom.Classname);
  }

  return (
    <>
      {/* Classwork View */}
      {props.viewFrom === "Classwork" && <>
        <Box md={{ Width: '100%' }} sx={{ display: 'block', marginLeft: '5px' , marginTop: '25px' }} >
          {AssignmentObject.length !== 0 && AssignmentObject !== -1 && <>  {AssignmentObject.map((object) => (<>
            <div class="card" style={{ border: '0px solid' }}>
              <Button onClick={() => { NevigateToViewMaterial(object.assignment._id); }} style={{ height: '55px' }} >
                <div class="card-body">
                  <div className='row'>
                    <div className='col-1' style={{ paddingLeft: '20px' }}>
                      <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%' }}>
                        <AssignmentIcon sx={{ fontSize: '30px', color: 'white', verticalAlign: 'middle', marginTop: '5px' }} />
                      </div>
                    </div>
                    <div className='col-11' >
                      <Box sx={{ display: 'flex' }}>
                        <Typography color="textPrimary" variant="h6" sx={{ fontSize: '20px' , width: '500px' }}>{object.assignment.Title}</Typography>
                        <Stack direction="row" justifyContent="end" sx={{ marginLeft: '50%' }}>
                          <span className='title-of-material-of-date' sx={{ fontSize: '18px', verticalAlign: 'middle' }} style={{ marginTop: '12px' }}>Posted At {object.createDate} {object.updateDate !== null && <>(Edited At {object.updateDate})</>}</span>
                        </Stack>
                      </Box>
                    </div>
                  </div>
                </div>
              </Button></div><hr /> </>))}
          </>}
        </Box>

        {AssignmentObject.length === 0 && <><Box sx={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </Box></>}

        {AssignmentObject === -1 && <>Not Yet Any Assigment</>}

      </>}

    </>
  );
}

export default ViewAssignment;

