import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = ()=>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authFail = (err) =>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:err
       
    }
}

export const authSuccess = (token,userId) =>{
    
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId
    }
}

export const logOut = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTH_LOGOUT
    }
}
export const authLogOut = (expirationTimeOut)=>{
    return dispatch => {
        setTimeout(()=>{
            dispatch(logOut())
        }
       ,expirationTimeOut*1000);
    }
}


export const auth =(email, password,isSignUp) =>{
    return dispatch =>{
            dispatch(authStart());
            const authData={
                email:email,
                password:password,
                returnSecureToken:true
            }
            let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoecjLht9O0X2q9JPznJMKw7Np7iS6yjE';
            if(!isSignUp){
                url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoecjLht9O0X2q9JPznJMKw7Np7iS6yjE';
            }
            axios.post(url,authData).then(
                res=>{
                    const expirationDate= new Date(new Date().getTime() + res.data.expiresIn *1000);
                    //console.log(res.data.email);
                    localStorage.setItem('token',res.data.idToken);
                    localStorage.setItem('expirationDate',expirationDate);
                    localStorage.setItem('userId',res.data.localId);
                    dispatch(authSuccess(res.data.idToken,res.data.localId));
                    dispatch(authLogOut(res.data.expiresIn));
                }
            ).catch(error=>{
                console.log(error.response);
              dispatch(authFail(error.response.data.error))
            }
                );
    }
};

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT,
        path:path
    }
};

export const authCheckState = () =>{
    return dispatch =>{
            const token = localStorage.getItem('token');
            if(!token){
                dispatch(logOut());
            }
            else{
                const expirationDate = new Date(localStorage.getItem('expirationDate'));
                if(expirationDate > new Date()){
                    const userId=localStorage.getItem('userId');
                    
                    dispatch(authSuccess(token,userId));
                 // dispatch(authLogOut(expirationDate.getTime() - new Date().getTime())/1000);
                  
                }else{
                    dispatch(logOut());
                }
            }
    }
}