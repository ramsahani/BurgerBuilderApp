import {React,Component} from 'react';
import Button from '../../../components/UI/Button/button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './contactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input';
import {connect } from 'react-redux';
import * as actions from './../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class ContactData extends Component{
    state={
        orderForm:{
           
                    name:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your Name'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    } ,
                    street:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Street'
                        },
                        value:'' ,
                        validation:{
                            required:true
                        },
                        valid:false,touched:false
                    },
                    zipcode:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'ZIP Code'
                        },
                        value:'',
                        validation:{
                            required:true,
                            minLength:5,
                            maxLength:5,
                        },
                        valid:false,
                        touched:false
                    } ,
                    country:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Country'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    } ,
                email:{
                    elementType: 'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'E-Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                 },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'normal',displayValue:'Normal'}
                    ]
                },
                value:'fastest',validation:{},
                valid:true,
            } 
        },
        isFormValid:false,
    
    }

    orderHanlder =(event)=>{
       event.preventDefault(); 
       // this.setState({loading:true});
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId:this.props.userId 
           
        }
        this.props.orderBurger(order,this.props.token);
        // axios.post('/orders.json',order).then( response =>{
        //     this.setState({loading:false});
        //     console.log(response);
        //     this.props.history.push('/');
        // }).catch(error => {
        //     this.setState({loading:false});
        //     console.log(error);
        // });
       

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
        return isValid;
    }
    inputChangeHandler( event ,inputIdentifier){
        
        const updatedForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value=event.target.value
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedForm[inputIdentifier]=updatedFormElement;
        let isFormvalid=true;
        
        for(let inputIdentifier in updatedForm){
            isFormvalid = updatedForm[inputIdentifier].valid && isFormvalid;
        }
        console.log(isFormvalid);
        this.setState({orderForm:updatedForm,isFormValid:isFormvalid});
    }

    render(){
        let formElements=[];
        for(let key in this.state.orderForm){
            formElements.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=(<form onSubmit={this.orderHanlder}>
            

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
           
            <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Data</h4>
                {form};

            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice:state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        orderBurger : (order,token) => dispatch(actions.purchaseBurger(order,token))
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));