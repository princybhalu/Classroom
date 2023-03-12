import axios from "axios";

export const UploadMaterial = async (rbody) => {
    const res = await axios.post('/material/upload/', rbody);
    // const res = await axios.post('/material/upload/',prop, rbody);
    // const res = await axios.post('/material/upload/',formData);
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