import React, { Component } from 'react';
import classes from './modal.module.css';
import Aux from '../../../hoc/Auxilliary';
import Backdrop from '../Backdrop/backdrop';


class  Modal extends Component {

    shouldComponentUpdate(nextProps,nextStat){
        return nextProps.show !== this.props.show  || nextProps.children!==this.props.children;

    }

    componentDidUpdate(){
        console.log('modal will update');
    }
    render () {
        return (

            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}></Backdrop>
               <div className={classes.Modal}
            style={{transform : this.props.show? 'translateY(0)': 'translateY(-100vh',
                    opacity : this.props.show ? '1':'0'    
            }}
        >
            {this.props.children}
        </div> 
        </Aux>

        );

    }
} 

export default Modal;