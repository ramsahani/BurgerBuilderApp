

import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import { Component} from 'react';
import Checkout from './containers/Checkout/checkout';
import {Switch,Route, withRouter} from 'react-router-dom';
import Orders from './containers/Orders/orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
class App extends Component {

  state={
    show:true
  }

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  
    render(){
        return (
          <Layout>
              <Switch>
              <Route path='/logout' component={Logout} />
              <Route path='/authentication' component={Auth} />
              
              <Route path='/checkout' component={Checkout}/>
              <Route path='/orders' component={Orders} />
              <Route path='/' exact component={BurgerBuilder} />

                
              </Switch>
           </Layout>
         )

      }
   
 
  
}

const mapDispatchToProps =dispatch =>{
  return{
    onTryAutoSignUp : () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null,mapDispatchToProps)(App));
