import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from 'assets/PlantMama_logo.svg'

export const Nav = () => {
// NavLinks have "active" class that can be styled
  return (
    <nav>
      <img className="logo" src={Logo} alt="PlantMama logo" />
      <ul>
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contacts </NavLink>
        </li>
      </ul>
    </nav>
  )
}