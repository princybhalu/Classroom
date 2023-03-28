import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';
import ViewMaterial from '../material/viewMaterial';
import ViewAssignment from '../assignment/viewAssignment';
import Material from '../material/uploadMaterial';
import { useSelector } from 'react-redux';
import { RoleName } from '../model/RoleName';
import Navbarofclassroom from '../components/navbarofclassroom';
import Streamofclassroom from '../components/streamofclassroom';

// 'Stream', 'Classwork', 'People' 

function ViewClassroom() {

  let { class_id } = useParams();
  const [Classroom, SetClassroom] = useState({});
  const [IsSetClassroom, SetIsSetClassroom] = useState(0);

  const [OpenWhichComponent, SetOpenWhichComponent] = useState("Stream");

  GetClassroomByClassidApiCall(class_id).then((result) => { SetClassroom(result); SetIsSetClassroom(1); }).catch((err) => { console.log(err) });

  const user = useSelector(state => state.user);

  GetClassroomByClassidApiCall(class_id).then((result) => { SetClassroom(result); }).catch((err) => { console.log(err) });

  return (
    <>
      {IsSetClassroom === 1 ? <Navbarofclassroom classroom={Classroom} activeLink={OpenWhichComponent} SetOpenWhichComponentCallBack={SetOpenWhichComponent} /> : <></>}

      {OpenWhichComponent === 'Stream' && IsSetClassroom === 1 && <><Streamofclassroom classroom={Classroom} /></>}
      {OpenWhichComponent === 'Classwork' && IsSetClassroom === 1 && <>Classwork</>}
      {OpenWhichComponent === 'People' && IsSetClassroom === 1 && <>People</>}
  
    </>

  )
}

export default ViewClassroom;