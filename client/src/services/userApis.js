import axios  from "axios";

export const AllStudentsApiCall = async () => {
    var res = await axios.get('/user/getAllStudents');
    return res.data ;
}

export const AllProfessorsApiCall = async () => {
    var res = await axios.get('/user/getAllProfessors');
    return res.data ;
}

export const GetOneUserApiCall = async (id) => {
    const res = await axios.get('/user/getOneUser/' + id);
    return res.data;
}

export const UpdateUserApiCall = async (id , rbody) => {
    const res = await axios.put('/user/update/' + id , rbody);
    return res ;
}

export const DeleteUserApiCall = async (id  , rbody) => {
    const res = await axios.put('/user/InactivateUser/' + id , rbody );
    return res ;
} 

export const JoinClassroomApiCall = async (rbody) => {
    const res = await axios.put('/user/joinclassRoom' , rbody);
    return res;
}