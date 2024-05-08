import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from "react-router-dom";
import logoSF from '../../assets/logoComturSF.png'
import './folhasyle.css';

const NavbarUsr = () => {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  useEffect(() => {
    // Adiciona um ouvinte de evento para fechar o menu ao clicar em um link
    $('.navbar-nav a').on('click', () => {
      setIsNavbarOpen(false);
    });
  }, []);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-black sticky-top px-4 px-lg-5">
        <a href="index.html" class="navbar-brand d-flex align-items-center">
        <a className="navbar-brand ML-1 w-8 sm:w-20 " href="#">
            <img src={logoSF} alt="logo" />
        </a>
        </a>
        <button type="button" class="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <div class="navbar-nav ms-auto p-4 p-lg-0 ">
                <a href="" class="nav-item nav-link active text-white" onClick={() => {navigate(`/Inicio`); window.location.reload();}}>Início</a>
                <a href="" class="nav-item nav-link text-white" onClick={() => {navigate(`/#`); window.location.reload();}}>Turismo</a>
                <a href="" class="nav-item nav-link text-white" onClick={() => {navigate(`/#`); window.location.reload();}}>Eventos</a>
                <a href="" class="nav-item nav-link text-white" onClick={() => {navigate(`/#`); window.location.reload();}}>Empresas</a>
                {/* <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle text-white" data-bs-toggle="dropdown">Visita</a>
                    <div class="dropdown-menu bg-light m-0">
                        <a href="gallery.html" class="dropdown-item">Guias</a>
                        <a href="feature.html" class="dropdown-item">Mapas</a>
                        <a href="team.html" class="dropdown-item">Agenda</a>
                    </div>
                </div> */}
                <a href="" class="nav-item nav-link text-white" onClick={() => {navigate(`/#`); window.location.reload();}}>Noticias</a>

                {/* <label className="nav-item btn btnmenulogin btn-warning mt-1 " htmlFor="Acessar" onClick={() => {navigate(`/login`); window.location.reload();}}>Entrar/Cadastrar</label> */}
                
            </div>
            <div class="border-start ps-4 d-none d-lg-block">
                <button type="button" class="btn btn-sm p-0"><i class="fa fa-search text-white"></i></button>
            </div>
        </div>
    </nav>
  );
};

export default NavbarUsr;