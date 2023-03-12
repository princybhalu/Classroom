import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';

function ViewClassroom() {

  let { class_id } = useParams();
  const [Classroom, SetClassroom] = useState({});

  GetClassroomByClassidApiCall(class_id).then((result) => { SetClassroom(result); }).catch((err) => { console.log(err) });

  return (
    <> </>
  )
}

export default ViewClassroom;