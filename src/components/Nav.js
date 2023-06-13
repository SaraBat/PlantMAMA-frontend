/* eslint-disable no-unused-expressions */
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from 'assets/PlantMama_logo.svg';
import log from 'assets/log.png'
import '../styling/Nav.css'

export const Nav = () => {
// NavLinks have "active" class that can be styled

  return (
    <nav>
      <div className="top-left">
        <img className="logo" src={Logo} alt="PlantMama logo" />
      </div>
      <ul className="top-right">
        <li>
          <NavLink to={-1}> Back </NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contacts </NavLink>
        </li>
        <li>
          <NavLink to="/" onClick={() => { window.location.reload() }}> <img className="log-icon" alt="login-logout" src={log} /> </NavLink>
        </li>
      </ul>
    </nav>
  )
}

/*
          <li>
            <NavLink to={`/${username}/garden`}> Home </NavLink>
          </li>
*/
/*
  const location = useLocation();
  const showUserGardenLink = () => {
    location.pathname !== `/${username}/garden`
      ? <li> <NavLink to={`/${username}/garden`}>User Garden</NavLink> </li> : null
  };
  */