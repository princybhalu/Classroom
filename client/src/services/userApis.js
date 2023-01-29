import axios  from "axios";

export const AllUserApiCall = async () => {
    var res = await axios.get('/user/getAllUser');
    return res.data ;
}

export const GetOneUserApiCall = async (id) => {
    const res = await axios.get('/user/getOneUser/' + id);
    return res.data;
}

export const UpdateUserApiCall = async (id , rbody) => {
    const res = await axios.put('/user//update/' + id , rbody);
    return res ;
}

export const DeleteUserApiCall = async (id  , rbody) => {
    const res = await axios.put('/user/InactivateUser/' + id , rbody );
    return res ;
}