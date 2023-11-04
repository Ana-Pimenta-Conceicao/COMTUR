import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Noticia from './screens/noticia/index';
import Home from "./screens/home";
import TipoTurismo from "./screens/tipoturismo";
import TipoAtracao from "./screens/tipoatracao";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home" exact element={ <Home />} />
                <Route path="/noticia" element={ <Noticia /> } />
                <Route path="/tipoturismo" element={ <TipoTurismo/> }/>
                <Route path="/tipoatracao" element={ <TipoAtracao/> }/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;