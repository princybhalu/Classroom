import React, { useEffect } from 'react'
import { useState } from 'react';
import { viewMaterialApiCall } from '../services/materialApis';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { Button, Backdrop, Box, Modal, Fade, Typography, TextField, Card, CardContent, TableContainer, TableBody, TableHead, TableRow, Paper, Table } from '@mui/material';
import { DeleteMatrialApiCall } from '../services/materialApis';
import { useSelector } from 'react-redux';


function ViewMaterial() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Material, SetMaterial] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  const DeleteMatrialCall = async (deleteMatrial) => {
    console.log('delete Matrial');
    console.log(deleteMatrial)

    try{
      const requestBody = {
        user_Id : user._id
      }
      console.log(requestBody);

      const res = await DeleteMatrialApiCall(deleteMatrial,requestBody)

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
    Classid : "63c0fb0683a0bbaf03ba50a7"
  }

  viewMaterialApiCall(requestBody).then((result) => { SetMaterial(result);}).catch((err) => {console.error(err)});
  // console.log(Material)

  return (
    <>
      {Material.map((material) => (
        <>
            <h4>{material.Title}</h4>
            <h4>{material.Description}</h4>
            
            <a href={material.Attach} target="_blank" rel="noopener noreferrer">
                <img src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${material.Attach}#page=1`} style={{ border: '1px solid black' }} alt="PDF Front Page" />
            </a>
            <h4>{material._id}</h4>
            <Button onClick={async () => {DeleteMatrialCall(material._id);}} variant="contained" color='error' sx={{ marginRight: '5px' }}>
              Delete
            </Button>
            <Button onClick={() => { navigate('/material/update/' + material._id) }} variant="contained" sx={{ marginRight: '5px' }}>
              Edit
            </Button>
            <br/>

        </>
      ))}
    </>


  )
}

export default ViewMaterial