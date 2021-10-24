import React, {useEffect, useState}          from 'react';
import styled                     from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import { cambioPerfilAction, actualizarDatosAction } from '../../actions/userAction'
import { usuarioAutenticadoAction } from '../../actions/authAction';
import { mostrarAlertaAction } from '../../actions/alertasAction';
import { FaArrowLeft }             from "react-icons/fa";

const PerfilEdicion = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ContenedorForm = styled.div`
    width: 100%;
    max-width: 450px;
    padding: 1em;
    list-style: none;
    color: white;

    @media(min-width: 768px){
        margin-top: 1em;
        padding: 2em;
        border: 1px solid white;
        border-radius: 12px;
    }
    
    p{
        font-size: 14px;
        cursor: pointer;
    }
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: auto;
    color: white;

    label{
        margin: 6px 0;
        font-size: 14px;
    }

    input{
        margin: 5px 0;
        border: 0;
        color: white;
        background: transparent;
        padding: 10px;
        outline: 0;
        font-size: 14px;
        border-bottom: 2px solid #00B7FF;
          
        &:focus{
        border-bottom: 2px solid #828282;
        }
        &:valid + .label, &:focus + .label{
        top: 1em;
        left: 1em;
        font-size: .9em;
      }
    }

    input::placeholder{
        color: white;
        font-family: "Font Awesome 5 Free";
    }

    button{
        margin: 2em 2em 0em 2em;
        color: white;
        background: #00B7FF;
        padding: 10px 0;
        border: 0;
        border-radius: 12px;
        transition: .2s ease-out;
        cursor: pointer;
       
       &:hover{
        background: #006c96;
       }
       }

       textarea{
        margin: 10px 0;
        border: 0;
        color: white;
        background: transparent;
        padding: 10px;
        outline: 0;
        font-size: 14px;
        border-bottom: 2px solid #00B7FF;
        resize:none;
          
        &:focus{
        border-bottom: 2px solid #828282;
        }
        &:valid + .label, &:focus + .label{
        top: 1em;
        left: 1em;
        font-size: .9em;
       }
    }
`;

const Alarma = styled.div`
    margin: 1em auto 0em auto;
    width: 90%;
    border: 1px solid #e01919;
    padding: 10px 5px;
    border-radius: 12px;

    p{
        text-align: center;
        color: white;
        font-size: 12px;
        margin: 0;
    }
`;


const Edicion = () => {

//estado global
    const dispatch        = useDispatch();
    const cambioPerfil    = () => dispatch (cambioPerfilAction());
    const actualizarDatos = (id, imguser, newdateuser) => dispatch(actualizarDatosAction(id, imguser, newdateuser));
    const usuarioAutenticado = () => dispatch( usuarioAutenticadoAction() );
    const mostrarAlerta      = (mensaje) => dispatch( mostrarAlertaAction(mensaje) );

    const usuario = useSelector(state => state.auth.usuario);
    const {alarma, msg}  = useSelector(state => state.user);
  
    const {alerta, mensaje} = useSelector(state => state.alerta);

    const id       = usuario._id;
    const name     = usuario.nombre;
    const biografy = usuario.bio;
    const cumple   = usuario.cumpleaños;
    const phone    = usuario.telefono;
    const correo   = usuario.email;   

    const [ imguser, setImguser ] = useState({}); 
    const [newdateuser, setNewDateUser] = useState({
         nombre: name,
         bio: biografy,
         cumpleaños: cumple,
         telefono: phone,
         email: correo
     });

     const { nombre, bio, cumpleaños, telefono, email} = newdateuser;
     
     const valorimg = (e) => {
         const ruta = e.target.files[0];
         setImguser(ruta);
     }

     const cambios = (e) => {
         setNewDateUser({
             ...newdateuser,
             [e.target.name] : e.target.value
         })
     }

     const envioDatos = (e) => {
         e.preventDefault()
        if(nombre.trim() === '' || email.trim() === '') {
            mostrarAlerta('El nombre y el correo no pueden estar vacios');
            return
        }
        actualizarDatos(id, imguser, newdateuser);
     }


    useEffect(() =>{
        usuarioAutenticado()
        //eslint-disable-next-line
    }, [alarma]);

    return ( 
        <PerfilEdicion>
       
        <ContenedorForm>
        <p onClick={() => cambioPerfil()} >  <FaArrowLeft /> Back</p>
        <h3>Edicion del perfil</h3>
        <p>Cambia los datos que te interesen</p>
      
        <Form>
        <input 
            type="file"
            name="imagen"
            onChange = { valorimg }
        />

        <label htmlFor="nombre">Nombre</label>
        <input 
            type="text"
            id = "nombre"
            placeholder=" Ingresa tu nombre"
            name="nombre"
            value={nombre}
            onChange = {cambios}
        />

        <label htmlFor="bio">Biografia</label>
            <textarea
            type="text"
            id="bio"
            name="bio"
            value={bio}
            onChange = {cambios}   
        ></textarea>

        <label htmlFor="cumpleaños">Cumpleaños</label>
        <input 
            type="date"
            id="cumpleaños"
            placeholder=" Ingresa tu fecha de cumpleaños"
            name="cumpleaños"
            value={cumpleaños}
            onChange = {cambios}
        />

        <label htmlFor="telefono">Telefono</label>
        <input 
            type="text"
            id="telefono"
            name="telefono"
            value={telefono}
            onChange = {cambios}
        />

        <label htmlFor="email">Email</label>
        <input 
            type="email"
            id="email"
            placeholder=" Ingresa tu email"
            name="email"
            value={email}
            onChange = {cambios}
        />

        {alerta ? <Alarma><p>{mensaje}</p></Alarma> : null }

        {alarma ? 
            <Alarma> <p> {msg} </p> </Alarma>
        : null} 
        
        <button 
            onClick={envioDatos}
        >Guardar</button>

        </Form>
        </ContenedorForm>
    </PerfilEdicion>
     );
}
 
export default Edicion;