import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from "react-router-dom";
import logoSF from '../../assets/logoComturNovo.svg';
import { Link } from "react-router-dom";
import Login from "../../assets/login.png";

const NavbarUsr = () => {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    setIsLoggedIn(!!userId);

    $('.navbar-nav a').on('click', () => {
      setIsNavbarOpen(false);
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    const baseUrl = "https://localhost:7256/api/Login";

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("token", token);

      localStorage.removeItem("token");
      localStorage.removeItem("tipoUsuario");
      localStorage.removeItem("nome");
      localStorage.removeItem("id");

      try {
        await axios.post(baseUrl + "/Logout", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    }
  };

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <>
      <style>
        {`
        .navbar.sticky-top {
          top: -100px;
          transition: .5s;
        }

        .navbar {
          background-color: #064D56 !important;
        }

        .navbar .navbar-nav .nav-link {
          margin-right: 35px;
          padding: 25px 0;
          font-size: 18px;
          font-weight: normal;
          outline: none;
        }

        .navbar .navbar-nav .nav-link:hover,
        .navbar .navbar-nav .nav-link.active {
          color: var(--primary);
        }

        .search-input {
          display: inline-block;
          width: 200px;
          margin-left: 10px;
        }

        @media (max-width: 991.98px) {
          .navbar .navbar-nav .nav-link  {
            margin-right: 0;
            padding: 10px 0;
          }

          .search-input {
            width: calc(100% - 35px);
            margin-top: 0;
            margin-left: 0;
          }

          .border-start {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0;
          }

          .border-start .btn {
            margin-left: 10px;
          }
        }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-dark sticky-top px-4 px-lg-5">
        <div className="navbar-brand d-flex align-items-center">
          <a className="navbar-brand ML-1 w-8 sm:w-20" href="#">
            <img src={logoSF} alt="logo" />
          </a>
        </div>
        <button type="button" className="navbar-toggler me-0" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto d-flex p-4 p-lg-0">
            <a href="" className="nav-item nav-link active text-white" onClick={() => { navigate(`/`); }}>Início</a>
            <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todosTurismos`); }}>Turismo</a>
            <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todosEventos`); }}>Eventos</a>
            <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`#`); }}>Comtur</a>
            <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todasNoticias`); }}>Notícias</a>
            <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/todasEmpresas`); }}>Empresas</a>
            {!isLoggedIn && (
              <a href="" className="nav-item nav-link text-white" onClick={() => { navigate(`/login`); }}>Login</a>
            )}

            <div className="d-flex align-items-center">
              {isLoggedIn && (
                <Link
                  to="/login"
                  onClick={handleLogout}
                  className="d-flex align-items-center nav-item nav-link text-white"
                >
                  <img
                    src={Login}
                    alt="Logout"
                    className="me-2"
                    style={{ width: '20px', height: '20px' }}
                  />
                  <span>Sair</span>
                </Link>
              )}
            </div>
          </div>

          <div className={`border-start m-2 ps-4 ${isMobile ? 'd-flex align-items-center' : 'd-none d-lg-block'}`}>
            {isSearchOpen && (
              <input type="text" className="form-control search-input" placeholder="Pesquisar..." />
            )}
            <button type="button" className="btn btn-sm p-0 ml-2" onClick={handleSearchToggle}>
              <i className="fa fa-search text-white"></i>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarUsr;
