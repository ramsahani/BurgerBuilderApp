
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxilliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/toolbar';
import SideDrawer from '../../components/Navigation/SiderDrawer/SideDrawer';

class Layout extends Component {
        state={
            showSideDrawer:false,
        }

        sideDrawerClosedHandler =()=>{
            this.setState({showSideDrawer:false})
        }

        sideDrawerToggleHandler =()=>{
            this.setState( (prevState) =>{
                return{showSideDrawer:! prevState.SideDrawer}
            });
            
        }

        
    render(){ 
        return (
            <Aux>
            <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler}/>
            <SideDrawer  isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
             <main className={classes.content}>
            {this.props.children}
            </main>
        </Aux>

        );

    }


}

const mapStateToProps = state =>{
        return{
            isAuthenticated: state.auth.token !== null,
        }
};

export default connect(mapStateToProps)(Layout);