import React from 'react';
import {Link ,hashHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';

function dashboard () {

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
<<<<<<< HEAD
      <Link to='/auth/updateUser'>Upadate User</Link>
      <br />
      <Link to='/classroom/createClass'>Create Classroom</Link>
      <br />
      <Link to='/classroom/updateClass'>Update Classroom</Link>
      <br />
      <Link to='/classroom/viewClass'>View Classes</Link>
=======
      <Link to={'/auth/update/'+ user._id } >Upadate User</Link>
      <br />
      <Link to='/auth/allUser'>All User</Link>
>>>>>>> main
    </>

  )
}

export default dashboard;