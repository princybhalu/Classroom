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

export const GetOneAssignmentApiCall = async (id) => {

    const res = await axios.get('/assignment/getOneAssignment/'+id);
    return res.data;

}

export const UpdateAssignmentApiCall = async (id,rbody) => {

    const res = await axios.put('/assignment/editassignment/' + id , rbody);
    return res;
}

export const SubmitAssignmentApiCall = async (id,rbody) => {

    const res = await axios.post('/assignment/submitassignment/' + id , rbody);
    return res;
}

export const AddMarkesApiCall = async(id , rbody) => {
    const res = await axios.put('/assignment/addPointsInSubmission' + id , rbody);
    return res ;
}