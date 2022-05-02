import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./event";

export const startLogin = (email, password) => {


  return async(dispatch) => {

   const resp = await fetchWithoutToken('auth', { email, password }, 'POST');
   const body = await resp.json();

   if (body.ok) {

        localStorage.setItem('token', body.token);
        localStorage.setItem('token-init-date', new Date().getTime());


        dispatch(login({
            uid: body.uid,
            name: body.name

        }))
   
    } else{
        Swal.fire('Error', body.msg, 'error');
    }

  };

};

export const startRegister = (name, email, password) => {

    return async(dispatch) => {
            
            const resp = await fetchWithoutToken('auth/new', { name, email, password }, 'POST');
            const body = await resp.json();

            if (body.ok) {

                localStorage.setItem('token', body.token);
                localStorage.setItem('token-init-date', new Date().getTime());

                dispatch(login({
                    uid: body.uid,
                    name: body.name
        
                }))

          
            } else{
                Swal.fire('Error', body.msg, 'error');
            }

    }
}

export const startChecking = () => {
    return async(dispatch) => {
        
        if( process.env.NODE_ENV !== 'test' ) {
     
            /*
            Si no hay token en el local storage o es un string vacio al
            realizar un localStorage.getItem("token")
            Devuelve false con el doble !! en vez de null o undefined
            */
        

            const isCurrentToken = !!(localStorage.getItem('token') || '');
                  
            /*
            Si la variable es false entonces dispara el checkingfinish
            y retorna la función para que no se siga ejecutando
            */
    
            if (!isCurrentToken){
                dispatch(checkingFinish()); 
                return;
            }
         
        }

        const resp = await fetchWithToken('auth/renew'); //by default it's GET
        const body = await resp.json();

       

        if (body.ok) {

            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
    
            }))

      
        } else{
           
            dispatch(checkingFinish());
        }


    };
}

const checkingFinish = () => ({  type: types.authCheckingFinish });


const login = (user) => ({

    type: types.authLogin,
    payload: user


});

export const startLogout = () => {
    return(dispatch) => {
        localStorage.clear();
        dispatch(eventLogout())
        dispatch(logout());
    }
};

const logout = () => ({
    type: types.authLogout
})