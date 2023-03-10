import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/dashboard/navbar';
import { useNavigate } from "react-router";
import './css/dashboard.css';
import { Link } from 'react-router-dom';
import ClassroomListByUserId from './classroom/classroomList';


function dashboard() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector(state => state.user);
  
  return (
    <>
      {/* <div>dashboard</div>
      <br />
      <Link to='/auth/login'>Login For All</Link>
      <br />
      <Link to='/auth/register'>Add User</Link>
      <br />
      <Link to={'/auth/update/'+ user._id } >Upadate User</Link>
      <br />
      <Link to='/auth/allUser'>All User</Link>
      <br />
      <Link to={'/auth/material/'+user.userId}>Material</Link>
      <br />
      <Link to={'/auth/showmaterial/'+user.userId}>Show Material</Link> */}
      <Navbar activeLink='Home' />
      <ClassroomListByUserId />
    </>

  )
}

export default dashboard;