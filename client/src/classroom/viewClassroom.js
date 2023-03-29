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
import Classworkofclassroom from '../components/classworkofclassroom';
import Peopleofclassroom from '../components/peopleofclassroom';

// 'Stream', 'Classwork', 'People' 

function ViewClassroom() {

  let { class_id } = useParams();
  const [Classroom, SetClassroom] = useState({});
  const [IsSetClassroom, SetIsSetClassroom] = useState(0);

  const [OpenWhichComponent, SetOpenWhichComponent] = useState("Stream");

  GetClassroomByClassidApiCall(class_id).then((result) => { SetClassroom(result); SetIsSetClassroom(1); }).catch((err) => { console.log(err) });

  const user = useSelector(state => state.user);

  
  return (
    <>
      {IsSetClassroom === 1 ? <Navbarofclassroom classroom={Classroom} activeLink={OpenWhichComponent} SetOpenWhichComponentCallBack={SetOpenWhichComponent} /> : <></>}

      {OpenWhichComponent === 'Stream' && IsSetClassroom === 1 && <><Streamofclassroom classroom={Classroom} /></>}
      {OpenWhichComponent === 'Classwork' && IsSetClassroom === 1 && <><Classworkofclassroom classroom={Classroom} /></>}
      {OpenWhichComponent === 'People' && IsSetClassroom === 1 && <><Peopleofclassroom classroom={Classroom}  /></>}
  
    </>

  )
}

export default ViewClassroom;