import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Noticia from './screens/noticia/noticia';
import VisualizarNoticia from './screens/noticia/visualizarNoticia';
import Home from "./screens/home";
import Empresa from "./screens/empresa/empresa"; 
import TipoTurismo from "./screens/turismo/tipoTurismo";
import Atracao from "./screens/atracao/atracao";
import Inicio from "./screens/inicio/inicio";
import TipoUsuario from "./screens/tipousuario/tipousuario";
import Usuario from "./screens/usuarios/usuarios";
import Funcionario from "./screens/usuarios/funcionario";
import Administrador from "./screens/usuarios/administrador";
import UsuarioComum from "./screens/usuarios/usuarioComum";
import Empresario from "./screens/usuarios/empresario";
import Login from "./screens/login/login";
import TipoAtracao from "./screens/atracao/tipoatracao";
import TodasNoticias from "./screens/noticia/todasNoticias";
import NotFound from "./screens/notFound";
import HomeEmpresario from "./screens/empresario/homeEmpresario";
import Turismo from "./screens/turismo/turismo";
import VisualizarTurismos from "./screens/turismo/visualizarturismo";
import VisualizarAtracao from "./screens/atracao/visualizarAtracao";
import VisualizarEmpresa from "./screens/empresa/visualizarEmpresa";
import VisualizarPerfil from "./screens/usuarios/perfilusuarios";

const isUserLoggedIn = () => {
    // Verificar se há um token armazenado no localStorage
    const token = localStorage.getItem("token");

    // Se o token existir e não for nulo, consideramos o usuário como logado
    return token !== null && token !== undefined && token !== "";
};

// Componente de rota protegida que verifica se o usuário está logado
const ProtectedRoute = ({ element, path }) => {
    const isLoggedIn = isUserLoggedIn();
    return isLoggedIn ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Inicio />} />
                <Route path="/visualizarNoticia/:id" element={ <VisualizarNoticia/>} />
                <Route path="/todasnoticias" element={<TodasNoticias/>} />
                <Route path="/login" element={ <Login/> } />
                <Route path="/notfound" element={<NotFound/>} />
                <Route path="/visualizarTurismo/:id" element={<VisualizarTurismos/>}/>
                <Route path="/visualizarEmpresa/:id" element={<VisualizarEmpresa/>}/>

                {/* <Route path="/home"  element={ <Home />} /> */}
                <Route path="/noticia" element={<ProtectedRoute element={ <Noticia /> } />}/>
                <Route path="/tipoturismo" element={<ProtectedRoute element={ <TipoTurismo/> }/>}/>
                <Route path="/atracao" element={<ProtectedRoute element={ <Atracao/> }/>}/>
                <Route path="/tipoatracao" element={<ProtectedRoute element={ <TipoAtracao /> }/>}/>
                <Route path="/tipousuario" element={<ProtectedRoute element={<TipoUsuario/>} />}/>
                <Route path="/usuario" element={<ProtectedRoute element={ <Usuario/> } />}/>
                <Route path="/funcionario" element={<ProtectedRoute element={ <Funcionario/> } />}/>
                <Route path="/administrador" element={<ProtectedRoute element={ <Administrador/> } />}/>
                <Route path="/usuariocomum" element={<ProtectedRoute element={ <UsuarioComum/> } />}/>
                <Route path="/empresario" element={<ProtectedRoute element={ <Empresario/> } />}/>
                <Route path="/perfil/:id" element={<ProtectedRoute element={ <VisualizarPerfil/> } />}/>
                <Route path="/homeEmpresario" element={<ProtectedRoute element={<HomeEmpresario/>} /> } />
                <Route path="/turismo" element={<ProtectedRoute element={<Turismo/>} /> } />
                <Route path="/visualizaratracao/:id" element={<VisualizarAtracao/>} />
                <Route path="/empresa" element={<ProtectedRoute element={<Empresa/>}/> } />

                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;