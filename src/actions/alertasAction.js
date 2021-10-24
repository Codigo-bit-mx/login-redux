import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA
} from '../types/index';


export function mostrarAlertaAction(msg){
   return (dispatch) => {
   
    dispatch({
        type: MOSTRAR_ALERTA,
        payload: msg
    })

    setTimeout(() => {
        dispatch({
            type: OCULTAR_ALERTA
        })
    }, 2000);
   }

}