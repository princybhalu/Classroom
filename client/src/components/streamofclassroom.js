import React, { useState } from 'react';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import { Box, Container, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import ViewMaterial from '../material/viewMaterial';
import Material from '../material/uploadMaterial';
import { useSelector } from 'react-redux';
import CampaignRoundedIcon from '@mui/icons-material/CampaignRounded';

function Streamofclassroom(props) {

    const user = useSelector(state => state.user);
    const [openUplaodForm, SetopenUplaodForm] = useState(0);
    const [whichYouWantToPost, SetwhichYouWantToPost] = useState("Material");

    const handleChangeOfRadioButtonOfSelectTypeOfUplaod = (event) => {
        SetwhichYouWantToPost(event.target.value);

    }


    console.log(props.classroom);
    return (
        <>
            <Box md={{ Width: '100%' }} sx={{ display: 'flex', flexGrow: 1, marginTop: '50px' }} >
                <Container>
                    <div className="card bg-dark text-white" >
                        <img className="card-img" src={ImageUrlList.imageurl[props.classroom.Classname.length % ImageUrlList.imageurl.length]} alt="Card image" />
                        <div className="card-img-overlay">
                            <h5 className="card-title stream-card-title">{props.classroom.Classname}</h5>
                        </div>
                    </div>

                    <div className='row mt-2'>
                        <div className='col-2'>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="card-text">Class code</h6>
                                    <h4 className="card-title" style={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>{props.classroom.Classcode}</h4>
                                </div>
                            </div>
                        </div>

                        <div className='col-10'>
                            <div class="card">
                                {
                                    openUplaodForm === 0 ? <>
                                        <Button onClick={() => SetopenUplaodForm(1)}>
                                            <div class="card-body">
                                                <div className='row'>
                                                    <div className='col-1' style={{ paddingLeft: '20px' }}>
                                                        <CampaignRoundedIcon sx={{ color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length], fontSize: '30px' }} />
                                                    </div>
                                                    <div className='col announce-title' sx={{ fontSize: '20px' ,  color: ThemeColorList.themecolorlist[props.classroom.Classname.length % ImageUrlList.imageurl.length] }}>
                                                        Announce something to your class
                                                    </div>
                                                </div>
                                            </div>
                                        </Button></> :
                                        <>
                                            <div className='div-of-upload'>
                                                <FormLabel id="demo-row-radio-buttons-group-label">Which You Want To Uplaod</FormLabel>
                                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="SelectTypeOfUplaod"
                                                    onChange={handleChangeOfRadioButtonOfSelectTypeOfUplaod} >
                                                    <FormControlLabel value="Material" checked={whichYouWantToPost === 'Material'} control={<Radio />} label="Material" />
                                                    <FormControlLabel value="Assigment" control={<Radio />} label="Assigment" />
                                                </RadioGroup>
                                                {whichYouWantToPost === 'Material' ? <Material class_id={props.classroom._id} SetopenUplaodFormCallBack={SetopenUplaodForm} /> : <></>}
                                            </div>

                                        </>
                                }
                            </div>

                            <ViewMaterial class_id={props.classroom._id} />
                        </div>

                    </div>
                </Container>
            </Box>


        </>
    )
}

export default Streamofclassroom;
