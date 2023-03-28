import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetClassroomByClassidApiCall } from '../services/classroomApis';
import { Box, Toolbar, AppBar, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import Navbarofclassroom from '../components/navbarofclassroom';
import '../css/classroom.css';
import ArticleIcon from '@mui/icons-material/Article';
import { ImageUrlList } from '../model/imageUrlList';
import { ThemeColorList } from '../model/themeColorList';
import { GetOneMaterialApiCall } from '../services/materialApis';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from "react-router";
import { DeleteMatrialApiCall } from '../services/materialApis';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const settings = ['Update', 'Delete'];


function PageOfOneMaterial() {

    let { MaterialId, Classname } = useParams();
    let Classroom = {
        Classname: Classname
    }

    const [Material, SetMaterial] = useState();
    const [IsSetMaterial, SetIsSetMaterial] = useState(0);

    const user = useSelector(state => state.user);


    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    GetOneMaterialApiCall(MaterialId).then((result) => { SetMaterial(result); SetIsSetMaterial(1); }).catch((err) => { console.log(err) });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElNav, setAnchorElNav] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    //  Delete Material
    const DeleteMatrialCall = async (id) => {
        console.log('delete Matrial');
        console.log(id)

        try {
            const requestBody = {
                user_Id: user._id
            }
            console.log(requestBody);

            const res = await DeleteMatrialApiCall(id, requestBody)

            if (res.status === 200) {
                toast.success(res.data);
                console.log(res.data);
                navigate('/classroom/viewClassroom/'+ Material.materialObject.Classid );
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err.message);
        }
    }

    return (
        <>
            {/* Nav Bar */}
            <Navbarofclassroom classroom={Classroom} activeLink={"null"} SetOpenWhichComponentCallBack={"null"} />

            {/* Display Box Of Material */}
            {IsSetMaterial === 1 ? <><Box className="material-box-in-one-material-page" sx={{ display: 'flex', flexGrow: 1 }}>
                <div className='row' style={{ width: '75%' }}>
                    {/* Logo Of Material */}
                    <div className='col-1'>
                        <div className='material-icon' style={{ backgroundColor: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length], borderRadius: '50%', width: '50px', height: '50px' }}>
                            <ArticleIcon sx={{ fontSize: '33px', color: 'white', verticalAlign: 'middle', marginTop: '9px', marginLeft: '9px' }} />
                        </div>
                    </div>
                    {/* Material Display Part */}
                    <div className='col-9' style={{ marginLeft: '45px' }}>
                        <div className='main-title-of-material'>
                            <h2 style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }}>{Material.materialObject.Title}</h2>
                            <p style={{ color: 'rgb(74, 73, 73)' }}>{Material.proferserName} : {Material.createDate}</p>

                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <MoreVertIcon sx={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length] }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                                    keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                                    open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center">
                                                {setting === 'Update' && <> <Button onClick={() => navigate('/material/updateMaterial/' + Material.materialObject._id)} className="dropdown-item" sx={{ color: 'black' }}>  {setting}</Button></>}
                                                {setting === 'Delete' && <> <Button onClick={() => DeleteMatrialCall(Material.materialObject._id)} className="dropdown-item" sx={{ color: 'black' }}>  {setting}</Button>
                                                </>}  </Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </div>
                        <hr style={{ color: ThemeColorList.themecolorlist[Classname.length % ImageUrlList.imageurl.length], width: '900px', borderTop: '4px solid ' }} />

                        <div>{Material.materialObject.Description}</div>

                        <a href={Material.materialObject.Attach} target="_blank" rel="noopener noreferrer">
                            <img src={`https://res.cloudinary.com/djj0dl6dz/image/fetch/f_auto,q_auto:good,c_limit,h_200,w_200/${Material.materialObject.Attach}#page=1`} style={{ border: '1px solid black', width: '250px', height: '250px' }} alt="PDF Front Page" />
                        </a>

                    </div>

                </div>
            </Box>
            </> : <><Box sx={{ display: 'flex', marginLeft: '50%', marginTop: '60px' }}>
                <CircularProgress />
            </Box></>
            }

        </>

    )
}

export default PageOfOneMaterial;