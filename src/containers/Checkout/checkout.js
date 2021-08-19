import {React , Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route ,Redirect} from 'react-router-dom';
import ContactData from './ContactData/contactData';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import orderReducer from '../../store/reducers/order';

class Checkout extends Component{

    // state={
    //     ingredients:null,
    //     totalPrice:null
    // }

//    componentWillMount(){
//        const query=new URLSearchParams(this.props.location.search);
//        const ingredients={};
//         let price=null;
//        for(let param of query.entries()){
//            //['salad','1']
//            if(param[0]==='price'){
//                price=+param[1];
//                continue;
//            }
//            ingredients[param[0]]=+param[1];
//        }
//        console.log(ingredients);
//        console.log(price);
//        this.setState({ingredients:ingredients,totalPrice:price});
//    }
    checkoutCancelledHandler =() =>{
     
        this.props.history.goBack();
    }

    checkoutContinuedHandler = ()=>{
        this.props.history.push('/checkout/contact-data')
    }


    render(){
        let summary = <Redirect  to ='/'/>
        if(this.props.ingredients){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null ;
            summary =(
                <div>
                    {purchasedRedirect}
                <CheckoutSummary  ingredients={this.props.ingredients} 
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                />
                <Route path={this.props.match.url+'/contact-data'} component={ContactData} />
                </div>
            );

        }
        return summary;
    }

}
const mapPropsToState = state =>{
    return{
        ingredients:state.burgerBuilder.ingredients ,
        purchased: state.order.purchased
    }
}


export default connect(mapPropsToState)(Checkout);