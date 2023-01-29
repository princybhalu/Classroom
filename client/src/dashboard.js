import React from 'react';
import {Link} from 'react-router-dom';

const dashboard = () => {
  return (
    <>
      <div>dashboard</div>
      <br />
      <Link to='/auth/login'>Login For All</Link>
      <br />
      <Link to='/auth/register'>Add User</Link>
      <br />
      <Link to='/auth/updateUser'>Upadate User</Link>
    </>

  )
}

export default dashboard;