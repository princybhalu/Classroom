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
      <Link to={'/auth/update/'+ user._id } >Upadate User</Link>
      <br />
      <Link to='/auth/allUser'>All User</Link>
      <br />
      <Link to={'/auth/material/'+user.userId}>Material</Link>
      <br />
      <Link to={'/auth/showmaterial/'+user.userId}>Show Material</Link>
    </>

  )
}

export default dashboard;