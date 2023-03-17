import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';
import ViewMaterial from '../material/viewMaterial';
import ViewAssignment from '../assignment/viewAssignment';
import Material from '../material/uploadMaterial';
import UploadAssignment from '../assignment/uploadAssignment';
import { useSelector } from 'react-redux';
import { RoleName } from '../model/RoleName';

function ViewClassroom() {

  let { class_id } = useParams();
  const [Classroom, SetClassroom] = useState({});

  const user = useSelector(state => state.user);

  GetClassroomByClassidApiCall(class_id).then((result) => { SetClassroom(result); }).catch((err) => { console.log(err) });

  return (
    <>
    <center>
    <h2>Materials</h2>
    <ViewMaterial class_id={class_id} />
    <br/>
    <hr></hr>
    <h2>Assignment</h2>
    <ViewAssignment class_id={class_id} />
    <hr></hr>
    </center>
    {user.role === RoleName.PROFESSOR && <>
    <hr></hr>
    <Material class_id={class_id} />
    <hr></hr>
    <UploadAssignment class_id={class_id} />
    </>}
    
     </>
  )
}

export default ViewClassroom;