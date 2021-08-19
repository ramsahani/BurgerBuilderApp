import {React, Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import{ connect} from 'react-redux';

class Orders extends Component{

    // state={
    //     loading:true,
    //     orders:[]
    // }

    componentDidMount(){
        // axios.get('/orders.json').then(
        //     res=>{
        //         const fetchedOrders= [];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id:key
        //             });
        //         }
        //         this.setState({loading:false,orders:fetchedOrders})
        //     }
        // ).catch( errr =>{this.setState({loading:false})});
        this.props.onFetchOrders(this.props.token,this.props.userId);
    }


    render(){
        let ords=this.props.orders.map((order,key)=>{
          
            return <Order ingredients={order.ingredients} price={order.price} key={key}/>
        
        });
        if(this.props.loading){
            ords=<Spinner />
        }
        return (
           
            <div>
                {ords}
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        orders: state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders: (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));