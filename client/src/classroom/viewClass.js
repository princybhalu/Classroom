import axios from 'axios';
import { useEffect, useState , useMemo} from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import { useSelector } from 'react-redux';
import {GetAllClassroomApiCall} from '../service/classroomApi';

function ViewClass(){

    const [classRoom,SetClassRoom] = useState([]);

    const user = useSelector(state => state.user); 

    // useEffect(()=>{ 
        GetAllClassroomApiCall(user).then((result) => {
            SetClassRoom(result)
            
            console.log(classRoom);
            console.log(result)
           
        });
        // const res = axios.get('/classroom/getAllClass/'+user._id);
        
        
    // },[])  
    
    return(
        <>
            List Of Class
            <div>{!classRoom && 'loading...'}</div>
            <table>
            {
                classRoom && <>
                    <tr>{classRoom.map((arr)=>(<h1>{arr.classid}</h1>))}</tr>
                </>
                
            }
            </table>
        </>
    )
}

export default ViewClass;