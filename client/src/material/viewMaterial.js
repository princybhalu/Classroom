import React from 'react'
import { useState } from 'react';
import { viewMaterialApiCall } from '../services/materialApis';
import { Image } from 'cloudinary-react';


export default function ViewMaterial() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Material, SetMaterial] = useState([]);

  const requestBody = {
    Classid : "63c0fb0683a0bbaf03ba50a7"
  }

  viewMaterialApiCall(requestBody).then((result) => {console.log(result) ; SetMaterial(result);}).catch((err) => {console.error(err)});
  console.log(Material)

//   var html = '<table id="matrial">';
//   for(let i=0 ; i<Material.length ; i++){
//     html += '<tr>';
//     for(let j=0 ; j<Material[i].length ; j++){
//         html += '<td>' + M + '</td>';
//     }
//   }

  return (
    <>
      {Material.map((material) => (
        <>
            <h4>{material.Title}</h4>
            <h4>{material.Description}</h4>
            
            <a href={material.Attach} target="_blank" rel="noopener noreferrer">
                <img src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${material.Attach}#page=1`} style={{ border: '1px solid black' }} alt="PDF Front Page" />
            </a>
            <br/>
        </>
      ))}
    </>

    // <>
    //     <div>
    //         <div dangerouslySetInnerHTML={createMarkup(html)} />
    //     </div>
    // </>
  )
}

// function createMarkup(html1) {
//     return { __html: html1 };
// }