import React, { useEffect } from 'react'
import { useState } from 'react';
import { viewMaterialApiCall } from '../services/materialApis';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
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

  const user = useSelector(state => state.user);

  const DeleteMatrialCall = async (deleteMatrial) => {
    console.log('delete Matrial');
    console.log(deleteMatrial)

    try {
      const requestBody = {
        user_Id: user._id
      }
      console.log(requestBody);

      const res = await DeleteMatrialApiCall(deleteMatrial, requestBody)

      if (res.status === 200) {
        toast.success(res.data);
        console.log(res.data);
        navigate('/auth/allStudents');
      }
    } catch (err) {

      // console.log(err.res.status);
      toast.error(err.message);
      console.log(err.message);
    }
  }

  const requestBody = {
    Classid: props.classroom._id
  }

  viewMaterialApiCall(requestBody).then((result) => { if (result.length === 0) SetMaterial(-1); else SetMaterial(result); }).catch((err) => { console.error(err) });

  return (
    <>

      {/* Stream View */}
      {props.viewFrom === "Stream" && <>
        {Material.length !== 0 && Material !== -1 && <>  {Material.map((object) => (<>
          <div class="card">
            <Button >
              <div class="card-body">
                <div className='row'>
                  <div className='col-1' style={{ paddingLeft: '20px' }}>
                    <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%' }}>
                      <ArticleIcon sx={{ fontSize: '30px', color: 'white', verticalAlign: 'middle', marginTop: '5px' }} />
                    </div>
                  </div>
                  <div className='col-2' >
                    <div className='row'>
                      <div className='col h6 title-of-material' sx={{ fontSize: '24px' }}>
                        {object.material.Title}
                      </div>
                      <div className='col title-of-material-of-date' sx={{ fontSize: '18px' }}>
                        {object.createDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Button></div> </>))}
        </>}

        {Material.length === 0 && <><Box sx={{ display: 'flex', marginLeft: '50%' }}>
          <CircularProgress />
        </Box></>}

        {Material !== -1 && <></>}

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