import React from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <div className='navbar'>
      <div className='logo'>
        <NavLink to="/"> <h1 className='text-white'>EMS</h1> </NavLink>
      </div>
      <div className='buttons'>
        <NavLink to="/signin"> <button className='btn btn-warning mr-3'>Login</button></NavLink>
        <NavLink to="/signup"> <button className='btn btn-info'>Signup</button> </NavLink>

      </div>
    </div>
  )
}

export default Header