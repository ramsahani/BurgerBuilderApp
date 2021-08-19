import React from "react";
import { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControl from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/modal";
import OrderSummary from "../../components/Burger/OrderSummary/orderSummary";
import axios from "../../axios-order";
import Spinnner from "../../components/UI/Spinner/Spinner";
import withErrorHanlder from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

import { connect } from "react-redux";



class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={...}
    // }


    state ={
        // ingredients:{
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0,
        // },
      //  ingredients:null, //fetching from backend

      //  totalPrice:4,
      //  purchasable:false,      
        purchasing:false,
        
      
    }

    componentDidMount () {
        if(!this.props.ingredients){
            this.props.initIngredients();
        }
    }

    // addIngredientHandler = (type) =>{
    //    // const oldCount=this.state.ingredients[type];
    //    const oldCount=this.props.ingredients[type];
    //     const upDatedCount=oldCount + 1;
    //     const updatedIngredients={
    //         ...this.props.ingredients
    //     };
    //     updatedIngredients[type]=upDatedCount;
    //     this.props.updateIngredients(updatedIngredients);
    //     const priceAddition=INGREDIENT_PRICES[type];
    //     // const oldPrice=this.state.totalPrice;
    //     const oldPrice=this.props.totalPrice;
    //      const updatedPrice=oldPrice+priceAddition;
    //      this.props.updateTotalPrice(updatedPrice);
    //     // this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice});
    //      this.updatePurchaseState(updatedIngredients);
        

    // }
 //             // this.setState({ingredients: response.data});
    
    // removeIngredientHandler =(type) =>{
    //     //const oldCount=this.state.ingredients[type];
    //     const oldCount=this.props.ingredients[type];
    //     if(oldCount>0){
    //         const updatedCount=oldCount-1;
    //         const updatedIngredients={...this.props.ingredients};
    //         updatedIngredients[type]=updatedCount;
    //         const priceReduction=INGREDIENT_PRICES[type];
    //         const oldPrice=this.props.totalPrice;
    //         const updatedPrice =oldPrice- priceReduction;
    //        // this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice});
    //        this.props.updateIngredients(updatedIngredients);
    //        this.props.updateTotalPrice(updatedPrice);
    //         this.updatePurchaseState(updatedIngredients);
    //     }
    // }

    updatePurchaseState(ingredients){
        
        const sum= Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]   
        }).reduce((sum,ele) =>{
                return sum+ele;
        },0);
    //  this.setState({purchasable: sum >0 });
        return sum>0;
    
    }
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/authentication')
        }
         
    };

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }

    purchaseContinueHandler=()=>{
        // alert('You Continue!');
        // this.setState({loading:true});
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: "Ram Sahani",
        //         address:{
        //             street:'test stree',
        //             zipcode:'23423432',
        //             country:"India"
        //         },
        //         email:'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // }
        // axios.post('/orders.json',order).then( response =>{
        //     this.setState({loading:false,purchasing:false});
        //     console.log(response)
        // }).catch(error => {
        //     this.setState({loading:false,purchasing:false});
        //     console.log(error);
        // });
        // --------- passing state using params --
        // let queryParams =[];
        // for( let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) +'=' +encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price='+this.state.totalPrice);
        
       
        // const queryString = queryParams.join('&');
        // this.props.history.push({pathname:'/checkout',search: '?' + queryString});
        // --- use of redux
        this.props.onInitPurchse();
        this.props.history.push('/checkout')
  
    }
    render(){
        
        const disabledInfo={...this.props.ingredients};
        for( let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <=0;
        }

        let orderSummary=null;
        
       
        let burger=this.props.error ? <p>Ingredients can't be Loaded</p> : <Spinnner/>;
       
        if(this.props.ingredients){
            
            
            burger=<Aux>
                <Burger ingredients = {this.props.ingredients}/>
                <BuildControl 
                ingrendientAdded={this.props.addIngredients} 
                ingredientRemoved={this.props.removeIngredients} 
                disabled={disabledInfo}
                price={this.props.totalPrice} 
                purchasable={this.updatePurchaseState(this.props.ingredients)}
                ordered={this.purchaseHandler}
                isAuth={this.props.isAuthenticated}
                /> 

            </Aux>;
            orderSummary= <OrderSummary ingredients={this.props.ingredients} price={this.props.totalPrice} 
            purchaseCanceled={this.purchaseCancelHandler} purchased={this.purchaseContinueHandler}/>;
        }
     

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    
                        {orderSummary}
                   </Modal>
                   
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated : state.auth.token !==null
    }
}

const mapDispacthToProps = dispatch =>{
    return {
        initIngredients: () => dispatch(actions.initIngredients()),
        addIngredients : (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredients: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchse : () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps,mapDispacthToProps)(withErrorHanlder(BurgerBuilder,axios));