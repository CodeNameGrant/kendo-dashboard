import React from 'react'
import NavItems from '../../../components/Nav-Items';

import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.Header}>
      <nav>
        <NavItems />
      </nav>
    </header>
  )
}

export default Header;