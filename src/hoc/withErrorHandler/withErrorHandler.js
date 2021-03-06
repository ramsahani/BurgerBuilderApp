import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/modal';
import Aux from '../Auxilliary';

const withErrorHandler =(WrappedComponent ,axios) =>{


    return  class extends Component{
        constructor(props){
            super(props);
            this.state={
                error:null,
            };
           
     }

        // state={
        //     error:null
        // }
        
        componentDidMount(){
           this.reqIntereceptor= axios.interceptors.request.use(req =>{
                this.setState({error:null});
                return req;
            })
           this.resInterceptor = axios.interceptors.response.use(res => res,error =>{
                this.setState({error:error});
               
            });
        }
        componentWillUnmount(){
            console.log('componetWillUnmount',this.resInterceptor,this.reqIntereceptor);
            axios.interceptors.request.eject(this.reqIntereceptor);
            axios.interceptors.response.eject(this.resInterceptor);

        }
        
        errorConfirmedHandler = ( )=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}> 
                    {this.state.error ? this.state.error.message: null}
                </Modal>
    
               <WrappedComponent {...this.props}/>  
            </Aux>
            )
        }
    }
}

export default withErrorHandler;