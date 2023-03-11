import axios from "axios";

export const UploadMaterial = async (rbody) => {
    const res = await axios.post('/material/upload/', rbody);
    // const res = await axios.post('/material/upload/',prop, rbody);
    // const res = await axios.post('/material/upload/',formData);

    return res ;
}
