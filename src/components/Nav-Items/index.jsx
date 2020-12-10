import React from 'react'

import NavItem from './NavItem'

import classes from './NavItems.module.css';

const NavItems = (props) => {
  return (
    <ul className={classes.NavItems}>
      <NavItem link='/tree'>Tree</NavItem>
      <NavItem link='/forms'>My Form</NavItem>
      <NavItem link='/grids'>My Grid</NavItem>
      <NavItem link='/dashboard'>Dashboard</NavItem>
    </ul>
  )
}

export default NavItems;