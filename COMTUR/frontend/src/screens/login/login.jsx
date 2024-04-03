import React, { useState, useEffect } from 'react';
import "../login/folhasyle.css";
import { Input } from 'reactstrap';

const Login = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showFirstCard, setShowFirstCard] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsSmallScreen(windowWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='telacadastro'>
      <div>
        <button className="btnvoltar">
          <div className="d-flex align-items-center">
            <img src="../src/assets/iconseta.png" />
            <div className="ml-2" style={{ paddingLeft: "1%" }}>
              Voltar
            </div>
          </div>
        </button>
      </div>
      <div className="container display" style={{ background: 'white', width: '100%', marginTop: "6%", padding: "5% 5%", borderRadius: "5px"}}>
        <div className="row">
          {(!isSmallScreen || (isSmallScreen && showFirstCard)) && (
            <div className={isSmallScreen ? "card-flex col-12" : "card-flex col-7"}>
              <label className="titulo display">LOGIN</label>
              <label className="display">Informe seus dados para acessar</label>
              <div style={{ marginTop: "15px" }}>
                <label className="formulario">E-mail:</label>
                <input className={isSmallScreen ? "col-12 display c_text" : "col-9 display c_text"} type="email" name="email" id="email" placeholder="name@company.com" required="" />
                <label style={{ marginTop: "10px" }} className="display formulario">
                  Senha
                </label>
                <input className={isSmallScreen ? "col-12 display c_text" : "col-9 display c_text"} type="password" name="password" id="password" placeholder="••••••••" />

                <div className="text-center" style={{ paddingRight: "30%", marginTop: "10px" }}>
                  <label>Esqueci minha senha</label>
                </div>
                <div className="text-center display" style={{ marginTop: "15px", paddingRight: "30%" }}>
                  <button className="titulo btn btncad">ENTRAR</button>
                </div>
              </div>
              {isSmallScreen && (
                <div className="text-center" style={{ marginTop: "15px", paddingRight: "30%" }}>
                  <button className="btn btncad" onClick={() => setShowFirstCard(false)}>Ver Cadastro</button>
                </div>
              )}
            </div>
          )}
          {(!isSmallScreen || (isSmallScreen && !showFirstCard)) && (
            <div className={isSmallScreen ? "card-flex col-12" : "card-flex col-5"}>
              <label className="titulo display">CADASTRO</label>
              <label className="display">Ainda não possui conta?</label>
              <label className="display">Faça seu cadastro gratuitamente</label>
              <div>
                <button className="btncad" style={{ marginTop: "25px", paddingRight: "5%" }}>
                  <div className="d-flex align-items-center">
                    <img src="../src/assets/empresario.png" width="20%" height="20%" />
                    <div style={{ paddingLeft: "7%", textAlign: 'left' }}>
                      <label className="display btntipocad">Empresário</label>
                      <label className="display">Clique para cadastrar seu negócio</label>
                    </div>
                  </div>
                </button>

                <button className="btncad" style={{ marginTop: "15px", paddingRight: "13%" }}>
                  <div className="d-flex align-items-center">
                    <img src="../src/assets/cidadao.png" width="20%" height="20%" />
                    <div className="ml-2" style={{ paddingLeft: "7%", textAlign: 'left' }}>
                      <label className="display btntipocad">Cidadão</label>
                      <label className="display">Clique para se cadastrar</label>
                    </div>
                  </div>
                </button>
              </div>
              {isSmallScreen && (
                <div className="text-center" style={{ marginTop: "15px", paddingRight: "30%" }}>
                  <button className="btn btncad" onClick={() => setShowFirstCard(true)}>Voltar para o Login</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default Login;