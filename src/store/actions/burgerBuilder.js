import * as actionTypes from  './actionTypes';
import axios from "../../axios-order";

export const addIngredient =(name) =>{
    return{
        type: actionTypes.ADD_INGREDIENTS,
        ingName: name
    }
}
export const removeIngredient =(name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENTS,
        ingName: name
    }
}

export const setIngredients = (ingredients) =>{
      return{
          type: actionTypes.SET_INGREDIENTS,
          ingredients:ingredients
      }

}

export const fetchIngredientsFailed=()=>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
export const initIngredients = () =>{
    return dispatch =>{
        axios.get("https://react-my-burger-64044-default-rtdb.firebaseio.com/ingredients.json").then(
            response => {
              return dispatch(setIngredients(response.data));
            }
        ).catch(error => {
             return dispatch(fetchIngredientsFailed());
         })

    };
}