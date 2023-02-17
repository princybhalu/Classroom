import React from 'react';
import {Link ,hashHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
//import meetClone from './meetClone/meetClone';

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
      <br/>
      <Link to='/meetClone/meetClone'>meet</Link>

    </>

  )
}

export default dashboard;