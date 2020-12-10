import React from 'react'

import Header from './Header';

import classes from './Layout.module.css'

const Layout = ( props ) => {
  return (
    <div>
      <Header />

      <main className={classes.Content}>
        {props.children}
      </main>
    </div>
  )
}

export default Layout;