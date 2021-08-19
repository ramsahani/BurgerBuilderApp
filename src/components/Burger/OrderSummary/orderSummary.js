import React, { Component } from 'react';
import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/button';

class OrderSummary extends Component {
    // this could be a functional component doesn't had to be class component
    componentDidUpdate(){
        console.log("did update run");
    }


    render(){
        const ingredientSummary= Object.keys(this.props.ingredients).map( igKey =>{
            return <li key={igKey}>
                 <span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>});
        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredient: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
            <p>Continue Checkout ?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled} >CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchased}>CONTINUE</Button>
        </Aux>

        );
        }
}


export default OrderSummary;