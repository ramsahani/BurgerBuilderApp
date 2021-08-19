import React from 'react';
import Logo from '../../Logo/logo';
import NavigationItems  from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/backdrop';
import Aux from '../../../hoc/Auxilliary';

const sideDrawer =(props)=>{
    
    let attachedClasses= [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses =[classes.SideDrawer, classes.Open]
    }

    return (
        <Aux>

            <Backdrop show={props.open} clicked={props.closed}/>
             <div className={attachedClasses.join(" ")}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems  isAuthenticated={props.isAuth}></NavigationItems>
            </nav>
        </div>
        </Aux>
       
    );
};

export default sideDrawer;