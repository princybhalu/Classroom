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

    // console.log(user);

    // const classes = useMemo(()=>GetAllClassroomApiCall(user).then((result)=>{
    //     SetClassRoom(result.data)
    //     console.log(classRoom)
    // }),[])
  

    useEffect(()=>{ 
        GetAllClassroomApiCall(user).then(async(result) => {
            await SetClassRoom([...classRoom,result])
            console.log(result)
            console.log(classRoom);
        });
        // const res = axios.get('/classroom/getAllClass/'+user._id);
        
        
    },[])  
    
    return(
        <>
            List Of Class
        </>
    )
}

export default ViewClass;