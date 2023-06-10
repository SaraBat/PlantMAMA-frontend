import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
// NavLinks have "active" class that can be styled
  return (
    <nav>
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