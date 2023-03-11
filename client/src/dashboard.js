import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/dashboard/navbar';
import { RoleName } from './model/RoleName';
import { useNavigate } from "react-router";
import './css/dashboard.css';

function dashboard() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useSelector(state => state.user);
  return (
    <>
      <div>dashboard</div>
      <br />
      <Link to='/auth/login'>Login For All</Link>
      <br />
      <Link to='/auth/register'>Add User</Link>
      <br />
      <Link to='/auth/updateUser'>Upadate User</Link>
      <br />
      <Link to='/classroom/createClass'>Create Classroom</Link>
      <br />
      <Link to='/classroom/updateClass'>Update Classroom</Link>
      <br />
      <Link to='/classroom/viewClass'>View Classes</Link>
      <Link to={'/auth/update/'+ user._id } >Upadate User</Link>
      <br />
      <Link to='/auth/allUser'>All User</Link>
    </>
  );

  // return (
  // <>
  //   <Navbar activeLink='Home' />
  //    <Link to={'/auth/material/'+user.userId}>Material</Link>
  //    </>
  // );
}

export default dashboard;