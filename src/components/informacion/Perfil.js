import React, { useEffect }  from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { cambiarEdicionAction } from '../../actions/userAction';
import { usuarioAutenticadoAction } from '../../actions/authAction';

const ContenedorPerfil = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ULlista = styled.ul`
    width: 100%;
    max-width: 800px;
    padding: 1em;
    list-style: none;
  
    @media(min-width: 768px){
        margin-top: 1em;
        padding: 2em;
        border: 1px solid white;
        border-radius: 12px;
    }
`;

const TituloLI = styled.li`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    color: white;

    button{
        padding: 0.6em 1.8em;
        background-color: #333333;
        color: white;
        border: 1px solid white;
        border-radius: 12px;
        cursor: pointer;
        transition: .2s ease-out;

        &:hover{
            background-color: #2F80ED;;
        }
    }
`;

const BtnDiv = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
`;

const LI = styled.li`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-bottom: 1px solid white;
    padding: 1em 0;
    p{
        font-family: 'Noto Sans', sans-serif;
        font-size: 14px;
        color: white;
    }
`; 


const Perfil = () => {
    //estado global
    const dispatch = useDispatch();
    const cambioEdicion      = () => dispatch( cambiarEdicionAction() ); 
    const usuarioAutenticado = () => dispatch( usuarioAutenticadoAction ());

    const auth = useSelector(state => state.auth.usuario);
    const { nombre, bio, cumpleaños, telefono, email, estado } = auth;
    const alarma = useSelector(state => state.user.alarma);

    useEffect(() =>{
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [alarma]);
    
    return ( 
        <ContenedorPerfil>
        <ULlista>
            <TituloLI>
                <div>
                <h3>Perfil</h3>
                <p>Informacion visible para otros usuarios</p>
                </div>
                <BtnDiv>
                <button onClick={() => cambioEdicion()} >Editar</button>
                </BtnDiv>
            </TituloLI>
            
            <LI> 
                <p>Nombre:</p>        
                <p>{nombre}</p> 
            </LI>

            <LI> 
                <p>Biografia:</p>
                <p>{bio}</p> 
            </LI>

            <LI> 
                <p>Cumpleaños:</p>
                <p>{cumpleaños}</p> 
            </LI>

            <LI> 
                <p>Telefono:</p>
                <p>{telefono}</p> 
            </LI>
            
            <LI> 
                <p>Email:</p>
                <p>{email}</p> 
            </LI>

            <LI> 
                <p>Estado:</p>
                {estado ? <p>Activo</p> : null}

            </LI>
        </ULlista>
    </ContenedorPerfil>
     );
}
 
export default Perfil;