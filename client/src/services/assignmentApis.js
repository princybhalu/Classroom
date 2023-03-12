import axios from "axios";

export const UploadAssignmentApiCall = async (rbody) => {
    
    const res = await axios.post('/assignment/createassignment/', rbody);
    return res ;
}
