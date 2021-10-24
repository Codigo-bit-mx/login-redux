import React, { useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
//action de redux
import { usuarioAutenticadoAction } from '../../actions/authAction';

const RutaPrivadas = ({component: Component, ...props}) => {
    
    //estado global
    const dispatch = useDispatch()
    const usuarioAutenticado = () => dispatch(usuarioAutenticadoAction());
    const auth = useSelector (state => state.auth);
    const { autenticado } = auth;
    
    useEffect(() => {
        usuarioAutenticado()
        //eslint-disable-next-line
    },[])

    return (
        <Route { ...props} render={ props => !autenticado ? (
            <Redirect to = "/" />
        ) : (
            <Component { ...props} />
        )}
        />
     );
}
 
export default RutaPrivadas;