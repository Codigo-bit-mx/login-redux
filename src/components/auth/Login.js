import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AiOutlineGoogle } from "react-icons/ai";
import { Link }            from 'react-router-dom';
import { GoogleLogin }     from 'react-google-login';

//action de redux
import { iniciarSesionAction, 
         onSignInAction } from '../../actions/authAction';
import { mostrarAlertaAction } from '../../actions/alertasAction';
 
//estilos
const FormUsuario = styled.div`
    background-color: #171717;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
  
`;

const ContenedorForm = styled.div`
    padding: 1em 1em;
    margin: 4em 0;
    width: 100%;
    max-width: 300px;
    background-color: #171717;
    color: white;

    P{
        text-align: center;
        margin: 2em 0;
        font-size: 14px;
        font-family: 'Noto Sans', sans-serif;
        line-height: 22px;
    }
    @media(min-width: 768px){
       padding: 1em 1em;
       max-width: 400px;
    }
`;

const CampoForm = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 2em;
    align-items: center;

    input[type="email"] {
        
        border: 1px solid #e1e1e1;
        padding: 1rem;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        font-weight: 550;

    }
    
    input[type="password"]{
        
        border: 1px solid #e1e1e1;
        padding: 1rem;
        flex: 1;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
        font-size: 16px;
        font-weight: 550;
    }

    input::placeholder{
        color: #828282;
        font-family: "Font Awesome 5 Free";
    }

    input[type="submit"]{
        width: 100%;
        background-color: #2F80ED;
        color: white;
        padding: 10px 0;
        border: 1px solid #2F80ED;
        border-radius: 12px;
        outline: none;
        font-family: 'Noto Sans', sans-serif;
    }
`;

const ContenedorRedes = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 13px;
    padding: 10px 2em;

    @media(min-width: 768px){
        grid-gap: 16px;
        padding: 10px 5em;
    }
`; 

const RedesIcon = styled.div`
    border: 1px solid #fff;
    border-radius: 100%;
    p{
        margin: 0;
        color: white;
        font-weight: 550;
        font-size: 20px;
        padding: 16px;
        cursor: pointer;
    }
    &:hover{
        transition: .2s ease-in-out;
        background-color: #ffffff;
    p{
        color: #333333;
    }
    }
`;

const NuevaCuenta = styled.div`
    margin: 1.5em 0;
    a{
        text-align: center;
        color: white; 
    }
`;

const Alarma = styled.div`
    margin: 0 auto 1em auto;
    width: 90%;
    border: 1px solid #e01919;
    padding: 10px 5px;
    border-radius: 12px;

    p{
        color: white;
        font-size: 12px;
        margin: 0;
    }
`;


const Login = (props) => {

    //declaracion del estados globales
    const dispatch = useDispatch();
    //llamada a la accion para los diferentes action
    const iniciarSesion = (usuario) => dispatch( iniciarSesionAction (usuario));
    const onSignIn      = (date) => dispatch( onSignInAction(date) );
    const mostrarAlerta = (msg) => dispatch( mostrarAlertaAction(msg) );
    
    //uso del estado
    const auth = useSelector(state => state.auth);
    const {autenticado, alarma, error} = auth;

    const {alerta, mensaje} = useSelector(state => state.alerta);
    

    useEffect(() => {
        if(autenticado){    
            props.history.push('/informacion');
        }
    }, [autenticado, props.history]);

    //estados local
    const [usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario; 

    //cambio
    const datosForm = (e) => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value  
        })
    };

    const envioDatos = (e) => {
        e.preventDefault();
         if(email.trim() === '' || password.trim() === ''){
             mostrarAlerta("los datos estan incompletos");
             return
            }
            // logeo
             iniciarSesion(usuario);
    }


        const responseGoogle = (response) => {  
            if(response.error){
                mostrarAlerta("Entrada no permitida");
                return
            }else{
                const date = response.profileObj;
                onSignIn(date);
            }
        }

    return ( 

        <FormUsuario>

        <ContenedorForm>
            <h3>CodigoBitMx.!</h3>
            <p>Ingresa a tu perfil de codigoBit descrubre las nuevas implementaciones</p>

        <form
            onSubmit={envioDatos}
        >
            <CampoForm>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    placeholder=" Ingresa tu email"
                    onChange = { datosForm }
                />
            </CampoForm>

            <CampoForm>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    placeholder=" Ingresa tu password"
                    onChange = { datosForm }
                />
            </CampoForm>

             {alerta ? 
            <Alarma> <p> {mensaje} </p> </Alarma>
             : null}

            {alarma ? 
            <Alarma> <p> {error} </p> </Alarma>
            : null} 

            <CampoForm>
                <input
                    type="submit"
                    value="Iniciar Sesion"
                />
            </CampoForm>

        </form>

        <p>O continuar con estos perfiles sociales </p>
    
        <ContenedorRedes>
            <div></div>
            <GoogleLogin
            clientId="866270435461-psgl6qom45nv9bcf3j09j0h7j6mqqdnm.apps.googleusercontent.com"  
            render={renderProps => (
                <RedesIcon onClick={renderProps.onClick} disabled={renderProps.disabled}><p> <AiOutlineGoogle /></p></RedesIcon>
            )}
            buttonText=""
            onSuccess={ responseGoogle }
            onFailure={ responseGoogle }
            cookiePolicy={'single_host_origin'}
            />
            <div></div>

        </ContenedorRedes>

        <NuevaCuenta>
        <Link to={'/nueva-cuenta'}>
           <p> Obtenen un cuenta aqui</p>
        </Link>
        </NuevaCuenta>

        </ContenedorForm>

    </FormUsuario>

     );
}
 
export default Login;