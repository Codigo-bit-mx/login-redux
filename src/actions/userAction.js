import {
    REGISTRO_ACTUALIZADO_EXITO,
    MOSTRAR_ALARMA,
    OCULTAR_ALARMA,
    CAMBIOPERFIL,
    CAMBIOEDICION
} from '../types';

import clienteAxios from '../config/axios';

export function actualizarDatosAction (id, imguser, newdateuser) {
    return async (dispatch) => {
    
        try {
            if( imguser.name !== undefined ) {
                console.log("ENTRE");
                actualizarImgAction(id, imguser);
            }    
             const respuesta = await clienteAxios.put(`/api/user/${id}`, newdateuser);    
                
             dispatch({
                 type: REGISTRO_ACTUALIZADO_EXITO,
                 payload: respuesta.data.msg
            })
             
             setTimeout(() => {
                dispatch({
                    type: OCULTAR_ALARMA
                })
             }, 2000);
            
        } catch (error) {
            dispatch({
                type: MOSTRAR_ALARMA,
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

const actualizarImgAction = async(id, imguser) =>{

    const formDate = new FormData();
        formDate.append('archivo', imguser);
        console.log(formDate);
        try{
         await clienteAxios.put(`/api/user/imagen/${id}`, formDate);
            console.log("SE SUBIO LA IMAGEN")
        } catch (error) {
             console.log(error.response.data.msg);
        }
}


export function cambioPerfilAction () {
    return (dispatch) => {
        dispatch({
            type: CAMBIOPERFIL,
        });
    }
}   

export function cambiarEdicionAction () {
    return (dispatch) => {
        dispatch({
            type: CAMBIOEDICION 
        });
    }
}