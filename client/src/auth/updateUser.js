import React , { useState } from 'react';
import axios from 'axios';

function UpdateUser(prop) {
    console.log(prop.prop._id);

    
    const [user , setUser] = useState();

    const getUserFromApi = async () => {
        const res = await axios.post('/user/getOneUser/' + prop.prop._id );
        return await res.data ;
    }

    setUser(getUserFromApi());
    return (
        <div>updateUser</div>
    )
};

export default UpdateUser;