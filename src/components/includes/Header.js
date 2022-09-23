import React, { useEffect, useState } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate();
  const [getUser, setGetUser] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const location = useLocation();


  useEffect(() => {
    let arr = localStorage.getItem("user");
    console.log(arr,"email")
    if (arr) {
      let obj = JSON.parse(arr);
      setGetUser(obj)
      setIsLoggedin(true);
    }
  }, [getUser, isLoggedin]);


  const handleLogout = () => {
    // localStorage.clear("user")
    localStorage.removeItem('user');
    setIsLoggedin(false);
    navigate("/signin")
  }

  return (
    <div className='navbar'>
      <div className='logo'>
        <NavLink to="/"> <h1 className='text-white'>EMS</h1> </NavLink>
      </div>
      <div className='buttonsRight'>

        {(isLoggedin) ?

          <>
            {/* <button onClick={handleLogout} className='btn btn-warning mr-3'>Logout</button> */}
            
            <div class="dropdown">
              <button style={{ fontSize:'25px' }} class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                
                { getUser[0].toUpperCase() }
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink to="/signin" onClick={handleLogout} class="dropdown-item" href="#">Logout</NavLink>
              </div>
            </div>
          </>
          :
          <>
            <NavLink to={(location.pathname === '/signin') ? '/signup' : '/signin'}> <button className='btn btn-warning mr-3'>{ (location.pathname === '/signin') ? 'Register' : 'Login' }</button></NavLink>
            {/* <NavLink to="/signup"> <button className='btn btn-info'>Signup</button> </NavLink> */}
          </>
        }

      </div>
    </div>
  )
}

export default Header