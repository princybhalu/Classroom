import axios from "axios";

export const UploadAssignmnet = async (rbody) => {
    // const res = await axios.post('/material/upload/' + id , rbody);
    const res = await axios.post('/assignment/createassignment/', rbody);
    return res ;
}
