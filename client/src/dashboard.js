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
    <Navbar activeLink='Home' />
  );
}

export default dashboard;