import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';
import ViewMaterial from '../material/viewMaterial';
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
    <ViewMaterial class_id={class_id} />
    {user.role === RoleName.PROFESSOR && <>
    <Material class_id={class_id} />
    <UploadAssignment class_id={class_id} />
    </>}
     </>
  )
}

export default ViewClassroom;