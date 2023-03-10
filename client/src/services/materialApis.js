import axios from "axios";

export const UploadMaterial = async (rbody) => {
    // const res = await axios.post('/material/upload/' + id , rbody);
    const res = await axios.post('/material/upload/', rbody);
    return res ;
}
