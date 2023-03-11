import axios from "axios";

export const GetAllClassroomApiCall = async(user)=>{
    const res = await axios.get('/classroom/getAllClass/'+user._id);
    return res.data;
}