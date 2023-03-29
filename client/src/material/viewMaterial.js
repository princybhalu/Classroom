import React, { useEffect } from 'react'
import { useState } from 'react';
import { viewMaterialApiCall } from '../services/materialApis';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table, Stack } from '@mui/material';
import { DeleteMatrialApiCall } from '../services/materialApis';
import { useSelector } from 'react-redux';
import { RoleName } from '../model/RoleName';
import ArticleIcon from '@mui/icons-material/Article';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import '../css/classroom.css';
import CircularProgress from '@mui/material/CircularProgress';

function ViewMaterial(props) {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Material, SetMaterial] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const requestBody = {
    Classid: props.classroom._id
  }

  viewMaterialApiCall(requestBody).then((result) => { if (result.length === 0) SetMaterial(-1); else SetMaterial(result); }).catch((err) => { console.error(err) });

  const NevigateToViewMaterial = (id) => {
    console.log("call in navigate");
    navigate("/material/viewOneMaterial/" + id + "/" + props.classroom.Classname);
  }

  return (
    <>

      {/* Stream View */}
      {props.viewFrom === "Stream" && <>
        {Material.length !== 0 && Material !== -1 && <>  {Material.map((object) => (<>
          <div class="card">
            <Button onClick={() => { NevigateToViewMaterial(object.material._id); }} >
              <div class="card-body">
                <div className='row'>
                  <div className='col-1' style={{ paddingLeft: '20px' }}>
                    <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%' }}>
                      <ArticleIcon sx={{ fontSize: '30px', color: 'white', verticalAlign: 'middle', marginTop: '5px' }} />
                    </div>
                  </div>
                  <div className='col-2' >
                    <div className='h6 title-of-material' sx={{ fontSize: '24px' }}>
                      {object.material.Title}
                    </div>
                    <div className='title-of-material-of-date' sx={{ fontSize: '18px' }}>
                      {object.createDate} {object.updateDate !== null && <>(Edited At {object.updateDate})</>}
                    </div>
                  </div>
                </div>
              </div>
            </Button></div> </>))}
        </>}

        {Material.length === 0 && <><Box sx={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </Box></>}

        {Material === -1 && <></>}

      </>}

      {/* Classwork View */}
      {props.viewFrom === "Classwork" && <>
        <Box md={{ Width: '100%' }} sx={{ display: 'block', marginLeft: '5px' }} >
          {Material.length !== 0 && Material !== -1 && <>  {Material.map((object) => (<>
            <div class="card" style={{border: '0px solid'}}>
              <Button onClick={() => { NevigateToViewMaterial(object.material._id); }} style={{height: '55px'}} >
                <div class="card-body">
                  <div className='row'>
                    <div className='col-1' style={{ paddingLeft: '20px' }}>
                      <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%' }}>
                        <ArticleIcon sx={{ fontSize: '30px', color: 'white', verticalAlign: 'middle', marginTop: '5px' }} />
                      </div>
                    </div>
                    <div className='col-11' >
                      <Box sx={{ display: 'flex' }}>
                        <Typography color="textPrimary" variant="h6" sx={{ fontSize: '20px'  }}>{object.material.Title}</Typography>
                        <Stack direction="row" justifyContent="end" sx={{ marginLeft: '80%' }}>
                          <span className='title-of-material-of-date' sx={{ fontSize: '18px' , verticalAlign: 'middle' }} style={{marginTop: '12px'}}>Posted At {object.createDate} {object.updateDate !== null && <>(Edited At {object.updateDate})</>}</span>
                        </Stack>
                      </Box>
                    </div>
                  </div>
                </div>
              </Button></div><hr /> </>))}
          </>}
        </Box>
        {Material.length === 0 && <><Box sx={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </Box></>}

        {Material === -1 && <>Not Yet Any Material</>}

      </>}



    </>

  )
}

export default ViewMaterial;

// {Material.map((material) => (
//   <>
//     <h4>{material.Title}</h4>
//     <h4>{material.Description}</h4>

//     <a href={material.Attach} target="_blank" rel="noopener noreferrer">
//       <img src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${material.Attach}#page=1`} style={{ border: '1px solid black' }} alt="PDF Front Page" />
//     </a>
//     <br />
//     {/* <h4>{material._id}</h4> */}
//     {user.role === RoleName.PROFESSOR && <>
//       <Button onClick={async () => { DeleteMatrialCall(material._id); }} variant="contained" color='error' sx={{ marginRight: '5px' }}>
//         Delete
//       </Button>
//       <Button onClick={() => { navigate('/material/updateMaterial/' + material._id) }} variant="contained" sx={{ marginRight: '5px' }}>
//         Edit
//       </Button>
//     </>}
//     <br />
//     <br />

//   </>
// ))}

{/* <Box sx={{ my: 3, display: 'flex' }}>
<Typography color="textPrimary" variant="h6" sx={{ fontSize: '24px' }}>{object.material.Title}</Typography>
<Stack direction="row" justifyContent="end" sx={{ marginLeft: '60%' }}>
  <span className='title-of-material-of-date' sx={{ fontSize: '18px' }}>{object.createDate}</span>
</Stack>
</Box> */}