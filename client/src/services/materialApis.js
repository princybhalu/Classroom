import axios from "axios";

export const UploadMaterial = async (rbody) => {
    const res = await axios.post('/material/upload/', rbody);
    return res ;
}

export const viewMaterialApiCall = async (rbody) => {
    // console.log(rbody);
    const res = await axios.post('/material/view/', rbody);
    // console.log(res);
    return res.data;
}

export const DeleteMatrialApiCall = async (id,rbody) => {
    const res = await axios.post('/material/delete/' + id , rbody);
    return res;
}

export const UpdateMaterialApiCall = async (id,rbody) => {
    const res = await axios.put('/material/edit/' + id , rbody);
    return res;
}

export const GetOneMaterialApiCall = async (id) => {
    const res = await axios.get('/material/getOneMaterial/'+id);
    return res.data;
}