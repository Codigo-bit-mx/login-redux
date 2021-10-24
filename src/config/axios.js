import axios from 'axios';

const clienteAxios = axios.create({
    baseURL : 'https://login-back-21.herokuapp.com/'
});


export default clienteAxios;