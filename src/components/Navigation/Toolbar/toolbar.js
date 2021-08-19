import React from 'react';
import classes from './toolbar.module.css';
import Logo from '../../Logo/logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SiderDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked= {props.drawerToggleClicked} />
      
        <Logo />
        <nav className={classes.DesktopOnly}>
            <NavigationItems  isAuthenticated={props.isAuth} />
        </nav>
    </header>

);

export default toolbar;
