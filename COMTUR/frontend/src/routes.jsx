import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Noticia from './screens/noticia/noticia.jsx';
import VisualizarNoticia from './screens/noticia/visualizarNoticia.jsx';
import Home from "./screens/home/index.jsx";
import Empresa from "./screens/empresa/empresa.jsx"; 
import TipoTurismo from "./screens/turismo/tipoturismo.jsx";
import Atracao from "./screens/atracao/atracao.jsx";
import Inicio from "./screens/inicio/inicio.jsx";
import TipoUsuario from "./screens/tipousuario/tipousuario.jsx";
import Usuario from "./screens/usuarios/usuarios.jsx";
import Funcionario from "./screens/usuarios/funcionario.jsx";
import Administrador from "./screens/usuarios/administrador.jsx";
import UsuarioComum from "./screens/usuarios/usuarioComum.jsx";
import Empresario from "./screens/usuarios/empresario.jsx";
import Login from "./screens/login/login.jsx";
import TipoAtracao from "./screens/atracao/tipoatracao.jsx";
import TodasNoticias from "./screens/noticia/todasNoticias.jsx";
import NotFound from "./screens/notFound.jsx";
import HomeEmpresario from "./screens/empresario/homeEmpresario.jsx";
import Turismo from "./screens/turismo/turismo.jsx";
import VisualizarTurismos from "./screens/turismo/visualizarturismo.jsx";
import VisualizarAtracao from "./screens/atracao/visualizarAtracao.jsx";
import VisualizarTipoAtracao from "./screens/atracao/visualizarTipoAtracao.jsx";
import VisualizarEmpresa from "./screens/empresa/visualizarEmpresa.jsx";
import VisualizarPerfil from "./screens/usuarios/perfilusuarios.jsx";
import Status from "./screens/administrador/Status.jsx"
import TodasEmpresas from "./screens/empresa/todasEmpresas.jsx";
import TodosTurismos from "./screens/turismo/todosTurismos.jsx";
import TodosEventos from "./screens/turismo/todosEventos.jsx";

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
                <Route path="/todasempresas" element={<TodasEmpresas/>} />
                <Route path="/todosTurismos" element={<TodosTurismos/>} />
                <Route path="/todoseventos" element={<TodosEventos/>} />

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
                <Route path="/visualizartipoatracao/:id" element={<VisualizarTipoAtracao/>} />
                <Route path="/empresa" element={<ProtectedRoute element={<Empresa/>}/> } />
                <Route path="/status" element={<ProtectedRoute element={<Status/>}/> } />
                <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;