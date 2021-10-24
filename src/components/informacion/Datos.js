import React from 'react';
import styled             from 'styled-components';
import Menu               from './Menu';
import Perfil             from './Perfil';
import Edicion            from './Edicion';
import { useSelector }    from 'react-redux';

const DateContent = styled.div`
    background-color: #171717;
    height: 100%;
    width: 100%;
`;

const Presentacion = styled.div`

    h2{
        color: white;
        text-align:center;
        font-family: 'Noto Sans', sans-serif;
    }
    p{
        color: white;
        text-align: center;
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
        margin-top: 2em;
    }

`;


const Datos = () => {

    const editar = useSelector(state => state.user.editar);

    return (  

    <DateContent>
        <Menu />
    <Presentacion>
        <h2>Información personal</h2>
        <p>¿Te gusta tu foto y tu nombre de perfil?</p>
    </Presentacion>


    { !editar ? (
        <Perfil />
    ) : (
        <Edicion />
    ) }

    </DateContent>

    );
}
 
export default Datos;