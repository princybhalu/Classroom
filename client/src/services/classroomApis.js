import axios  from "axios";

export const CreateClassroomApiCall = async (rbody) => {
    const res = await axios.post('/classroom/createclass' , rbody);
    return res;
}