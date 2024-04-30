import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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
import Usuario from "./screens/usuarios/usuarios";
import Login from "./screens/login/login";
import TipoAtracao from "./screens/tipoatracao/tipoatracao";
import TodasNoticias from "./screens/noticia/todasNoticias";
import CadastroUsuario from "./screens/cadastro/cadastrousuario";
import CadastroEmpresario from "./screens/cadastro/cadastroEmpresario";
import PerfilUsuario from "./screens/usuarios/perfilusuarios";
import NotFound from "./screens/notFound";

const isUserLoggedIn = () => {
    // Verificar se há um token de autenticação armazenado no localStorage
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
                

                {/* <Route path="/home"  element={ <Home />} /> */}
                <Route path="/noticia" element={<ProtectedRoute element={ <Noticia /> } />}/>
                <Route path="/tipoturismo" element={<ProtectedRoute element={ <TipoTurismo/> }/>}/>
                <Route path="/atracao" element={<ProtectedRoute element={ <Atracao/> }/>}/>
                <Route path="/tipoatracao" element={<ProtectedRoute element={ <TipoAtracao /> }/>}/>
                <Route path="/empresario" element={<ProtectedRoute element={ <Empresario/>} />}/>
                <Route path="/administrador" element={<ProtectedRoute element={<Administrador/>}/>} />
                <Route path="/tipousuario" element={<ProtectedRoute element={<TipoUsuario/>} />}/>
                <Route path="/perfiladministrador/:id" element={<ProtectedRoute element={<PerfilAdministrador/> } />}/>
                <Route path="/usuario" element={<ProtectedRoute element={ <Usuario/> } />}/>
                <Route path="/cadastrousuario" element={<ProtectedRoute element={<CadastroUsuario/>} />}/>
                <Route path="/cadastroempresario" element={<ProtectedRoute element={<CadastroEmpresario/>} />} />
                <Route path="/perfilUsuario/:id" element={<ProtectedRoute element={ <PerfilUsuario/> } />}/>
            
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;