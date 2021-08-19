import React from 'react';
import burgerLogo from "../../assets/img/28.1 burger-logo.png";
import classes from './logo.module.css';

const logo =(props) =>(
    <div className={classes.Logo} style={{height :props.height}}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
);

export default logo;