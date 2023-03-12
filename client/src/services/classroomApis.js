import axios  from "axios";

export const CreateClassroomApiCall = async (rbody) => {
    const res = await axios.post('/classroom/createclass' , rbody);
    return res;
}

export const GetClassroomListByUserIdApiCall = async (id) => {
    const res = await axios.get('/classroom/getClassroomList/' + id);
    return res.data ;
}

export const GetClassroomByClassidApiCall = async (id) => {
    const res = await axios.get('/classroom/getclass/' + id);
    return res.data ;
}