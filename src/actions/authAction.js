import {
     REGISTRO_EXISTOSO,   
     LOGIN_EXITOSO,     
     LOGIN_ERROR,     
     OBTENER_USUARIO,   
     CERRARSESION,
     OCULTAR_ALARMA
} from '../types';
import tokenAuth    from '../config/tokenAuth';
import clienteAxios from '../config/axios';

export function registroUsuarioAction(usuario) {
    return async ( dispatch ) => {
        try {
            const respuesta = await clienteAxios.post('api/auth/newuser', usuario);
            dispatch({
                type: REGISTRO_EXISTOSO,
                payload: respuesta.data
            });
        } catch (error) {
            
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALARMA   
                })
            }, 2000);
        
        }
    }
}

export function iniciarSesionAction(usuario) {
    return async (dispatch) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth/login', usuario);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });
        } catch (error) {
            
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
            setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALARMA   
                })
            }, 2000);
        }
    }
}

export function usuarioAutenticadoAction () {
    return async (dispatch) => {
    const token = localStorage.getItem('token');
    if(token){
       tokenAuth(token); //funcion para enviar el token al headear
    }
    try{    
        const respuesta = await clienteAxios.get('/api/auth/user'); 
        dispatch({
            type: OBTENER_USUARIO,
            payload: respuesta.data.usuario
        })
    }catch(error){
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
    }
    }
}

export function onSignInAction ( date ) {
 return async (dispatch) => {
    const {name, imageUrl, email} = date;    
    let datos = {
        nombre: name,
        img: imageUrl,
        email: email
    }
    try {
        const respuesta = await clienteAxios.post('/api/auth/google', datos );
        dispatch({
            type: LOGIN_EXITOSO,
            payload: respuesta.data
        });

    }catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALARMA   
            })
        }, 2000);
    }
 }
    
}

export function cerrarSesionAction () {
    return ( dispatch ) => {
        dispatch({
            type: CERRARSESION
        })
    }
}