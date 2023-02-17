import axios from "axios";

export const GetAllClassroomApiCall = async(user)=>{
    const res = await axios.get('/classroom/getAllClass/'+user._id);
    return res.data;
}

export const DeleteClassApiCall = async(id,body) => {
    const res = await axios.put('/classroom/Inactiveclass/'+id,body);
    return res;
}