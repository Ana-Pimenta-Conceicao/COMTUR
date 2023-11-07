import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Noticia from './screens/noticia/noticia';
import Home from "./screens/home";
import TipoTurismo from "./screens/tipoturismo";
import TipoAtracao from "./screens/tipoatracao";
import Inicio from "./screens/inicio/inicio";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={ <Inicio />} />
                <Route path="/home"  element={ <Home />} />
                <Route path="/noticia" element={ <Noticia /> } />
                <Route path="/tipoturismo" element={ <TipoTurismo/> }/>
                <Route path="/tipoatracao" element={ <TipoAtracao/> }/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;