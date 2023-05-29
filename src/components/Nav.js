import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Nav = () => {
// NavLinks have "active" class that can be styled
  return (
    <nav>
      <Link to="/"> Plant Mama </Link>
      <ul>
        <li>
          <NavLink to="/"> Home </NavLink>
        </li>
        <li>
          <NavLink to="/login"> Login </NavLink>
        </li>
        <li>
          <NavLink to="/contact"> Contacts </NavLink>
        </li>
      </ul>
    </nav>
  )
}