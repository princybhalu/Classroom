import React, { useState } from 'react';
import { Box, Toolbar, AppBar, Typography, Menu, Container, Button, Tooltip, MenuItem } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';
import '../css/user/profile-picture.css';
import ClassIcon from '@mui/icons-material/Class';
import LogoutIcon from '@mui/icons-material/Logout';
import PortraitIcon from '@mui/icons-material/Portrait';
import { RoleName } from '../model/RoleName';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slices/userSlice';
import '../css/dashboard.css';
import '../css/classroom.css';

// const pages = [];
const settings = ['Profile', 'Logout'];

function Navbarofclassroom(props) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElNav, setAnchorElNav] = useState(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorElUser, setAnchorElUser] = useState(null);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()

    // Sing Out Function
    const signoutFuncioncall = () => { dispatch(signOut()); }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const user = useSelector(state => state.user);

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

    let pages = ['Stream', 'Classwork', 'People'];

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl" className='Container-of-header'>
                <Toolbar disableGutters>

                    <Box sx={{ flexGrow: 1 }} className='classname-div'>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="h6" noWrap component="a"
                            sx={{
                                mr: 2, fontWeight: 500, color: 'inherit', textDecoration: 'none',
                            }}> {props.classroom.Classname}
                        </Typography>

                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }} >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {
                        props.activeLink !== "null" && <> <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <div key={page} >
                                    {page === 'Stream' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('Stream') }} className={props.activeLink === 'Stream' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Stream</Button>}
                                    {page === 'Classwork' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('Classwork') }} className={props.activeLink === 'Classwork' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Classwork</Button>}
                                    {page === 'People' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('People') }} className={props.activeLink === 'People' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>People</Button>}
                                </div>
                            ))}
                        </Box>
                        </>
                    }


                    {/* Profile Logo */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <div className='profile-picture '>  {user.name ? user.name[0] : 'C'} </div>
                            </IconButton>
                        </Tooltip>
                        <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right', }}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right', }}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        {setting === 'Profile' && <> <Button onClick={() => navigate('/auth/profile')} className="dropdown-item" sx={{ color: 'black' }}><PortraitIcon /> &nbsp; {setting}</Button></>}
                                        {setting === 'Logout' && <> <Button onClick={() => signoutFuncioncall()} className="dropdown-item" sx={{ color: 'black' }}><LogoutIcon /> &nbsp; {setting}</Button>
                                        </>}  </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>

            {
                props.activeLink !== "null" && <>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, marginLeft: '30%' }}>
                        {pages.map((page) => (
                            <div key={page} >
                                {page === 'Stream' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('Stream') }} className={props.activeLink === 'Stream' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Stream</Button>}
                                {page === 'Classwork' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('Classwork') }} className={props.activeLink === 'Classwork' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>Classwork</Button>}
                                {page === 'People' && <Button onClick={() => { props.SetOpenWhichComponentCallBack('People') }} className={props.activeLink === 'People' ? "active" : "nonactive"} sx={{ color: 'black', display: 'block' }}>People</Button>}
                            </div>
                        ))}
                    </Box>
                </>}

        </AppBar >
    )
}

export default Navbarofclassroom;
