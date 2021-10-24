import {
    REGISTRO_EXISTOSO,    
    LOGIN_EXITOSO,     
    LOGIN_ERROR,     
    OBTENER_USUARIO,   
    CERRARSESION, 
    OCULTAR_ALARMA
} from '../../types';

const initialState = { 
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
    autenticado: false,
    usuario: [],
    editar: false,
    alarma: false,
    error: ''
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
       
       case LOGIN_EXITOSO:
       case REGISTRO_EXISTOSO:
           localStorage.setItem('token', action.payload.token);
           return {
               ...state,
               token: localStorage.getItem('token'),
               autenticado: true,
               usuario: action.payload.usuario,
           }
        
        case OBTENER_USUARIO:
            return {
                ...state,
                autenticado: true,
                usuario: action.payload
            }

        case CERRARSESION:
            localStorage.removeItem('token');
            return {
                ...state,
                autenticado: false,
                token: null,
                usuario: null,
                editar: false
            }
    
        case LOGIN_ERROR:
                return{
                    ...state,
                    alarma: true,
                    error: action.payload
                }
    
        case OCULTAR_ALARMA: 
                return{
                    ...state,
                    alarma: false,
                    error: ''
                }
       
        default:
            return state
    }
}

export default authReducer;