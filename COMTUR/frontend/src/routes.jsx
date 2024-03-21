import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Noticia from './screens/noticia/noticia';
import VisualizarNoticia from './screens/noticia/visualizarNoticia';
import Home from "./screens/home";
import TipoTurismo from "./screens/tipoturismo";

import Atracao from "./screens/tipoatracao/atracao";
import Inicio from "./screens/inicio/inicio";
import Empresario from "./screens/empresario/empresario";
import Administrador from "./screens/administrador/administrador";
import TipoUsuario from "./screens/tipousuario/tipousuario";
import PerfilAdministrador from "./screens/administrador/perfilAdministrador";
import Usuario from "./screens/usuario/usuario";
import Login from "./screens/login/login";
import TipoAtracao from "./screens/tipoatracao/tipoatracao";


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/inicio" element={ <Inicio />} />
                <Route path="/home"  element={ <Home />} />
                <Route path="/noticia" element={ <Noticia /> } />
                <Route path="/tipoturismo" element={ <TipoTurismo/> }/>
                <Route path="/atracao" element={ <Atracao/> }/>
                <Route path="/tipoatracao" element={ <TipoAtracao /> }/>
                <Route path="/empresario" element={ <Empresario/>} />
                <Route path="/visualizarNoticia/:id" element={ <VisualizarNoticia/>} />
                <Route path="/administrador" element={<Administrador/>} />
                <Route path="/tipousuario" element={<TipoUsuario/>} />
                <Route path="/perfiladministrador/:id" element={<PerfilAdministrador/> } />
                <Route path="/usuario" element={ <Usuario/> } />
                <Route path="/login" element={ <Login/> } />
                <Route path="/administrador" element={ <Administrador/> } />
            </Routes>
        </Router>
    );
}

export default AppRoutes;