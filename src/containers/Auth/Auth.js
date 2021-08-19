import React,{Component} from 'react';
import Button from '../../components/UI/Button/button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.module.css';
import {connect} from 'react-redux';
import * as actions from  '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect, Rredirect} from 'react-router-dom';

class Auth extends Component {

    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
        },

        isSignUp:true
    }

    componentDidMount(){
        console.log(this.props.authRedirectPath);

        if(!this.props.buildingBurger  && this.props.authRedirectPath !=='/'){
            console.log('set');
            this.props.onSetAuthRedirectPath();
        }

    }

    checkValidity(value ,rules){
        let isValid =true;
        if(rules.required){
            isValid=value.trim() !=='' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid =value.length <=rules.maxLength && isValid;
        }
        if(rules.isEmail){
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid= re.test(String(value).toLowerCase()) && isValid ;
        }
        return isValid;
    }
    in
    inputChangeHandler( event ,inputIdentifier){
        
        const updatedForm={
            ...this.state.controls
        }
        const updatedFormElement={
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value=event.target.value
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedForm[inputIdentifier]=updatedFormElement;
        
        this.setState({controls:updatedForm});
    }

    submitHandler =(event )=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    switchModeHandler = ()=>{
        this.setState(prevState=>{
           return{
               isSignUp: !prevState.isSignUp
           } 
        });
    }

    render(){

        let formElements=[];
        for(let key in this.state.controls){
            formElements.push({
                id:key,
                config:this.state.controls[key]
            })
        }

        let form=(<form onSubmit={this.submitHandler} >
            

            {formElements.map(formElement =>(
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event,formElement.id) }
                value={formElement.config.value}/>
            ))}

            <Button btnType='Success'  >SUBMIT</Button>
            </form>);
        if(this.props.loading){
            form=<Spinner/>;
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=<p style={{'color':'red'}}>{this.props.error.message}</p>;
        }
            let authRedirect=null;
        if(this.props.isAuthenticated){
            authRedirect= <Redirect to={this.props.authRedirectPath} />

        }
        return(
            <div className={classes.Auth} >
                {authRedirect}
                {form}
                {errorMessage}
                <Button btnType='Danger' clicked={this.switchModeHandler} >Switch to {this.state.isSignUp? 'Sign In':'Sign Up'}</Button>
             
            </div>
        )
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email, password,isSignUp)),
        onSetAuthRedirectPath: () =>dispatch(actions.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);