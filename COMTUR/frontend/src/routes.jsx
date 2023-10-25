import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Noticia from './screens/noticia';
import Home from "./screens/home";
import TipoNoticia from './screens/tipoNoticia';
import TipoTurismo from "./screens/tipoturismo";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={ <Home />} />
                <Route path="/noticia" element={ <Noticia /> } />
                <Route path="/tipoNoticia" element={ <TipoNoticia /> } />
                <Route path="/tipoturismo" element={ <TipoTurismo/> }/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;
//ARRUMAR O NEGOCIO DE IR PRA NOTICIA
//CONECTAR COM  O NBACK END 