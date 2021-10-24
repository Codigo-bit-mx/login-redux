import {
    REGISTRO_ACTUALIZADO_EXITO,
    MOSTRAR_ALARMA,
    OCULTAR_ALARMA,
    CAMBIOPERFIL,
    CAMBIOEDICION
} from '../../types';


const initialState = {
    editar: false,
    alarma: false,
    msg: ''
}


const userReducer = (state = initialState, action) => {
    switch(action.type) {

        case REGISTRO_ACTUALIZADO_EXITO:
            return{
                ...state,
                alarma: true,
                msg: action.payload
            }

         case CAMBIOPERFIL:
            return {
                ...state,
                editar: false
            }
    
        case CAMBIOEDICION:
            return{
                ...state,
                editar: true
            }
        
        case MOSTRAR_ALARMA:
            return{
                ...state,
                alarma: true,
                msg: action.payload
            }
        
        case OCULTAR_ALARMA: 
            return{
                ...state,
                alarma: false,
                msg: ''
            }

        default: 
            return state
    }
}


export default userReducer;