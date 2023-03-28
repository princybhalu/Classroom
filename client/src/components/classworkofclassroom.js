import React from 'react';
import { Box } from '@mui/material';
import ViewAssignment from '../assignment/viewAssignment';
import ViewMaterial from '../material/viewMaterial';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';

function Classworkofclassroom(props) {
    return (
        <>
            <Box md={{ Width: '100%' }} sx={{ display: 'block', marginTop: '50px' , marginLeft: '15%'}} >

                {/* Assigment */}
                <div>
                    <h2 style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>Assigment</h2>
                    <ViewAssignment class_id={props.classroom._id} viewFrom={"Classwork"} />
                </div>

                <hr style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], width: '900px', borderTop: '4px solid ' }} />

                {/* Material */}
                <div>
                    <h2 style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>Material</h2>
                    <ViewMaterial classroom={props.classroom} viewFrom={"Classwork"} />
                </div>
            </Box>
        </>
    )
}

export default Classworkofclassroom;