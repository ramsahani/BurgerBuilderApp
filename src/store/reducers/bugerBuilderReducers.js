import * as actionTypes from '../actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false

}

const INGREDIENT_PRICES ={
    salad:0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const burgerBuilderReducers =(state=initialState ,action) =>{
    switch(action.type){
        case( actionTypes.SET_INGREDIENTS):
                return{
                    ...state,
                    ingredients:action.ingredients,
                    totalPrice:4,
                    error:false,
                    building:false
                }
        case(actionTypes.FETCH_INGREDIENTS_FAILED):
                return{
                    ...state,
                    error:true
                }
        case(actionTypes.ADD_INGREDIENTS):
                return{
                    ...state,
                        ingredients:
                        { 
                            ...state.ingredients,
                            [action.ingName]:state.ingredients[action.ingName]+1
                        },
                        totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingName],
                        building:true
                    
                }
        
        case(actionTypes.REMOVE_INGREDIENTS):
        return{
            ...state,
            ingredients:{
                ...state.ingredients,
                [action.ingName]:state.ingredients[action.ingName]-1
            },
            totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingName],
            building:true
        }
    }
    return state;
}

export default burgerBuilderReducers;