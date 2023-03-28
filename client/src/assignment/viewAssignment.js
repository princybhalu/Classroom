import React, { useEffect } from "react";
import { useState } from "react";
import {
  viewAssignmentApiCall,
  SubmitAssignmentApiCall,
} from "../services/assignmentApis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { Button, Grid , Box} from "@mui/material";
import { DeleteAssignmentApiCall } from "../services/assignmentApis";
import { useSelector } from "react-redux";
import { RoleName } from "../model/RoleName";
import { useFormik } from "formik";
import * as Yup from "yup";
import { clearAllListeners } from "@reduxjs/toolkit";


function ViewAssignment(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Assignment, SetAssignment] = useState([]);
  const [assId , SetassId] = useState();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const [file, fileChange] = useState();

  const user = useSelector((state) => state.user);

  const DeleteAssignmentCall = async (deleteAssignment) => {
    console.log("delete Assignment");
    console.log(deleteAssignment);

    try {
      const requestBody = {
        user_Id: user._id,
      };
      console.log(requestBody);

      const res = await DeleteAssignmentApiCall(deleteAssignment, requestBody);

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

  const requestBody = {
    Classid: props.class_id,
  };

  viewAssignmentApiCall(requestBody)
    .then((result) => {
      SetAssignment(result);
    })
    .catch((err) => {
      console.error(err);
    });
  // console.log(Material)

  const call = async (id) => {

    const RequestBody = {
      // user_Id: user._id,
      // Points: 0,
      // Attach: urlData,
      // Date: isoDate,
      // Assignment : value,
      Classid: props.class_id,
    };
    // var id = '640dd346b986bcf5889dbbf0'
    console.log("hello........")
    const response = await SubmitAssignmentApiCall(id,RequestBody);
    console.log("hello")
    console.log(response);

  }
 

  // var html = "";
  // if (Assignment.length !== 0 && Assignment !== -1) {
  //     for (let i = 0; i < Assignment.length; i++) {
  //         html += ` <h5 class="card-title">${Assignment[i].Instructions}</h5>
  //       <button onClick={ () => { call(${Assignment[i]._id}) }}>post</button>
  //         `;
  //     }
  // }

  return (
    <>
      {/* <div dangerouslySetInnerHTML={createMarkup(html)} /> */}
      {Assignment.map((assignment) => (
  <>
    <h3>{assignment.Title}</h3>
    <h3>{assignment.Instructions}</h3>
    {user.role === RoleName.STUDENT && (
      <>
        <Button
          onClick={() => {
            navigate("/assignment/studentUploadAssignment/" + assignment._id);
          }}
          variant="contained"
          sx={{ marginRight: "5px" }}
        >
          Open
        </Button>
      </>
    )}

    <a href={assignment.Attach} target="_blank" rel="noopener noreferrer">
      <img
        src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${assignment.Attach}#page=1`}
        style={{ border: "1px solid black" }}
        alt="PDF Front Page"
      />
    </a>
    <br />
    {/* <h4>{material._id}</h4> */}
    {user.role === RoleName.PROFESSOR && (
      <>
        <Button
          onClick={async () => {
            DeleteAssignmentCall(assignment._id);
          }}
          variant="contained"
          color="error"
          sx={{ marginRight: "5px" }}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            navigate("/assignment/updateAssignment/" + assignment._id);
          }}
          variant="contained"
          sx={{ marginRight: "5px" }}
        >
          Edit
        </Button>
      </>
    )}
    <br />
    <br />
  </>
))}
    </>
  );
}

export default ViewAssignment;

// function createMarkup(html1) {
//   return { __html: html1 };
// }


