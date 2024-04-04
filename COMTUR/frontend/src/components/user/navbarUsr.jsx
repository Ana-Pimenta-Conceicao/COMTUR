import React, { useState, useEffect } from 'react';
import $ from 'jquery'; // Certifique-se de instalar o jQuery no seu projeto
import 'bootstrap/dist/css/bootstrap.min.css'; // Certifique-se de importar o Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min';
import logoSF from '../../assets/logoComturSF.png'
 
import './folhasyle.css';
import { useNavigate } from "react-router-dom";
 
const NavbarUsr = () => {
  const tamanhoFonteInicial = 16;
  const cliquesMaximos = 4;
  const navigate = useNavigate();
  const [tamanhoFonte, setTamanhoFonte] = useState(tamanhoFonteInicial);
  const [cliques, setCliques] = useState(0);
  const [botaoSelecionado, setBotaoSelecionado] = useState(3); // Início selecionado inicialmente
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
 
  useEffect(() => {
    // Adiciona um ouvinte de evento para fechar o menu ao clicar em um link
    $('.navbar-nav a').on('click', () => {
      setIsNavbarOpen(false);
    });
  }, []);
 
  const aumentarFonte = () => {
    if (cliques < cliquesMaximos) {
      setTamanhoFonte((prevSize) => prevSize + 2);
      setCliques((prevCliques) => prevCliques + 1);
    }
  };
 
  const resetarFonte = () => {
    setTamanhoFonte(tamanhoFonteInicial);
    setCliques(0);
  };
 
  const handleBotaoSelecionado = (index) => {
    setBotaoSelecionado(index);
  };
 
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
 
  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg bg-black p-0 pt-2 pb-1" data-bs-theme="dark">
        <div className="flex container-fluid">
          <a className="navbar-brand ML-1 w-8 sm:w-20 " href="#">
            <img src={logoSF} alt="logo" />
          </a>
 
          <form className="flex bg-white w-56 sm:w-5/12 sm:h-12 h-8" role="search" style={{
            display: 'flex', border: '1px solid #ccc',
            borderRadius: '10px', alignItems: "center", fontSize: `${tamanhoFonte}px`
          }}>
            <input className="flex bg-white w-full h-full px-4 focus:outline-none" type="text" style={{ borderRadius: '10px' }}placeholder="Pesquisar" />
            <img className="sm:w-8 sm:h-8 h-7 w-7 p-2 ml-1" src="../src/assets/iconePesquisa.svg" alt="Ícone" />
          </form>
 
          <div className="navbar-toggler ml-3 mb-0 sm:ml-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={handleNavbarToggle}>
          <span className="navbar-toggler-icon"></span>
        </div>
 
        </div>
 
        <div className={`collapse navbar-collapse mt-1 ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ol className="navbar-nav grupobotoes ml-3 mt-1" role="group">
            <li className="nav-item">
              <input
                type="radio"
                className={`btn-check ${botaoSelecionado === 1 ? 'amarelocheck' : ''}`}
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                checked={botaoSelecionado === 1}
                onChange={() => handleBotaoSelecionado(1)}
              />
              <label
                className={`btn btnmenunav ml-0 ${botaoSelecionado === 1 ? 'btn-outline-warning' : 'btn-outline-black'}`}
                htmlFor="btnradio1"
              >
                Início
              </label>
            </li>
            <li className="nav-item">
              <input
                type="radio"
                className={`btn-check ${botaoSelecionado === 2 ? 'amarelocheck' : ''}`}
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                checked={botaoSelecionado === 2}
                onChange={() => handleBotaoSelecionado(2)}
              />
              <label
                className={`btn btnmenunav ${botaoSelecionado === 2 ? 'btn-outline-warning' : 'btn-outline-black'}`}
                htmlFor="btnradio2"
              >
                Turismo
              </label>
            </li>
            <li className="nav-item">
              <input
                type="radio"
                className={`btn-check ${botaoSelecionado === 3 ? 'amarelocheck' : ''}`}
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                checked={botaoSelecionado === 3}
                onChange={() => handleBotaoSelecionado(3)}
              />
              <label
                className={`btn btnmenunav ${botaoSelecionado === 3 ? 'btn-outline-warning' : 'btn-outline-black'}`}
                htmlFor="btnradio3"
              >
                Eventos
              </label>
            </li>
            <li className="nav-item">
              <input
                type="radio"
                className={`btn-check ${botaoSelecionado === 4 ? 'amarelocheck' : ''}`}
                name="btnradio"
                id="btnradio4"
                autoComplete="off"
                checked={botaoSelecionado === 4}
                onChange={() => handleBotaoSelecionado(4)}
              />
              <label
                className={`btn btnmenunav ${botaoSelecionado === 4 ? 'btn-outline-warning' : 'btn-outline-black'}`}
                htmlFor="btnradio4"
              >
                Empresa
              </label>
            </li>
            <li className="nav-item">
              <input
                type="radio"
                className={`btn-check ${botaoSelecionado === 5 ? 'amarelocheck' : ''}`}
                name="btnradio"
                id="btnradio5"
                autoComplete="off"
                checked={botaoSelecionado === 5}
                onChange={() => handleBotaoSelecionado(5)}
              />
              <label
                className={`btn btnmenunav mr-1 ${botaoSelecionado === 5 ? 'btn-outline-warning' : 'btn-outline-black'}`}
                htmlFor="btnradio5" 
                onClick={() => {
                  navigate(`/todasNoticias`);
                  window.location.reload();
                }}
              >
                Notícias
              </label>
            </li>
          </ol>
          <label className="btn btnmenulogin btn-warning ml-3 mt-1" htmlFor="Acessar">Entrar/Cadastrar</label>
        </div>
      </nav>
     
    </div>
  );
};
 
export default NavbarUsr;