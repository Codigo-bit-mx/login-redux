import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/nuevaCuenta';
import Datos from './components/informacion/Datos';
import RutaPrivadas from './components/rutas/RutasPrivadas';
//REDUX
import { Provider } from 'react-redux';
import store from './components/store';


const App = () => {
  return (
  
      <Router>
        <Provider store={store}>
          
     
        <Switch>
          <Route exact path ="/" component={Login}/>
          <Route exact path ="/nueva-cuenta" component={NuevaCuenta} />
          <RutaPrivadas exact path ="/informacion" component={Datos} />
        </Switch>

        </Provider>
        
      </Router>
  
      );
}

export default App;
