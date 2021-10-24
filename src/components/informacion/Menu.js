import React, { useState, useEffect } from 'react';
import styled                         from 'styled-components';
import { AiFillCaretDown }            from "react-icons/ai";
import {useDispatch, useSelector}     from 'react-redux';
import { cerrarSesionAction, usuarioAutenticadoAction } from '../../actions/authAction';
import { cambiarEdicionAction }       from '../../actions/userAction';

const ContenedorHeader = styled.div`
    width: 100%;
    min-width: 90%;
    margin: 0 auto;
`;

const ContenedorMenu = styled.div`
    display: grid;
    grid-template-columns: auto auto; 
    grid-gap: 5px;
    padding: 1em 1em;

    @media(min-width: 768px){
        padding: 1em 3em;
    }
`;

const Titulo = styled.div`
    
    h3{
        color: white;
    }
`;

const ContImg = styled.div`
   display: flex;
   justify-content: end;
   
   img{
    border-radius: 24px;
    width: 40px;
    height: 40px;
    margin: 0 5px 0 0
    }
    p{ 
        padding: 10px 0 0 0;
        margin: 0 0 0 5px;
        color: white;
        font-size: 14px;
        cursor: pointer;
    }
    span{
        font-size: 10px;
    }
`;

const MenuDespegable = styled.div`
    position: absolute;
    top: 3em;
    right: 2em;
    background-color: #171717;
    
    ul{
        padding: 0em 10px;
        margin: 0;
        list-style: none;
    }
     
    li{
        transition: .2s ease-out;
        cursor: pointer;
        &:hover{
            background-color: #171717;
        }
    }

    p {
        font-size: 14px;
        color: white;
    }
`;

const Menu = () => {
    
    //estado global
    const dispatch = useDispatch();
    const cerrarSesion       = () => dispatch( cerrarSesionAction() );
    const cambioEdicion      = () => dispatch( cambiarEdicionAction() );
    const usuarioAutenticado = () => dispatch( usuarioAutenticadoAction() );

    const auth = useSelector(state => state.auth.usuario);
    const { nombre, img } = auth;
    const alarma = useSelector(state => state.user.alarma);
    
    //estado local
    const [apertura, setApertura] = useState(false); 

    const menuEdicion = () => {
        setApertura(
            !apertura
        )
    }

    useEffect(() => {
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [alarma])


    return ( 

        <ContenedorHeader>
            <ContenedorMenu>
            
            <Titulo>
                <h3>CodigoBitMx</h3>
            </Titulo>

            <ContImg>
                <img src={img} alt="imagen user"/>
                <p onClick={()=>menuEdicion()} >Hola, {nombre} <span> <AiFillCaretDown /></span></p>
            </ContImg>

            { apertura ? (

                <MenuDespegable>
                    <ul>
                        <li>
                             <p onClick={() => cambioEdicion()}>Editar</p> 
                        </li>
                        <li>
                             <p onClick={() => cerrarSesion()}>Logout</p> 
                        </li>
                    </ul>
                </MenuDespegable>

            ) : null }



            </ContenedorMenu>
        </ContenedorHeader>

     );
}
 
export default Menu;