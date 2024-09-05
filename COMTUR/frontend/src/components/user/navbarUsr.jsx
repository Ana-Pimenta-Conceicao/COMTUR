import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from "react-router-dom";
import logoSF from '../../assets/logoComturSF.png';
import './folhasyle.css';

const NavbarUsr = () => {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);

  useEffect(() => {
    // Adiciona um ouvinte de evento para fechar o menu ao clicar em um link
    $('.navbar-nav a').on('click', () => {
      setIsNavbarOpen(false);
    });

    // Adiciona um ouvinte de evento para atualizar o estado de isMobile ao redimensionar a janela
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black sticky-top px-4 px-lg-5">

      <div className="navbar-brand d-flex align-items-center">
        <a className="navbar-brand ML-1 w-8 sm:w-20" href="#">
          <img src={logoSF} alt="logo" />
        </a>
      </div>
      <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          <a href="" className="nav-item nav-link active text-white" onClick={() => { navigate(`/`); }}>Início</a>
          <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todosTurismos`); }}>Turismo</a>
          <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todosEventos`); }}>Eventos</a>
          <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todasEmpresas`); }}>Empresas</a>
          <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todasNoticias`); }}>Noticias</a>
          <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/login`); }}>Login</a>
        </div>
        <div className={`border-start ps-4 ${isMobile ? 'd-flex align-items-center' : 'd-none d-lg-block'}`}>
          {isSearchOpen && (
            <input type="text" className="form-control search-input" placeholder="Pesquisar..." />
          )}
          <button type="button" className="btn btn-sm p-0 ml-2" onClick={handleSearchToggle}>
            <i className="fa fa-search text-white"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarUsr;
