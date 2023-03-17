import axios from "axios";

export const UploadAssignmentApiCall = async (rbody) => {
    
    const res = await axios.post('/assignment/createassignment/', rbody);
    return res ;
}

export const viewAssignmentApiCall = async (rbody) => {

    const res = await axios.post('/assignment/viewAssignment/', rbody);
    return res.data;

}

export const DeleteAssignmentApiCall = async (id,rbody) => {

    const res = await axios.post('/assignment/delete/' + id , rbody);
    return res;

}
