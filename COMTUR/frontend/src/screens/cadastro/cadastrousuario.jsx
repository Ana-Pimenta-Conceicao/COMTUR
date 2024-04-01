import React, { useState, useEffect } from 'react';
import "../cadastro/folhasyle.css";
import InputMask from 'react-input-mask';
import { Input } from 'reactstrap';

const CadastroUsuario = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showFirstCard, setShowFirstCard] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsSmallScreen(windowWidth < 868); // Ajuste o breakpoint conforme necessário
    };

    window.addEventListener('resize', handleResize);

    // Função de limpeza para remover o event listener quando o componente for desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ background: '#000', width: '100%', height: '110vh', padding: "4%", paddingTop: "2%", paddingBottom: "10%" }}>
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
      <div className="container display" style={{marginTop: "4%"}} >
        <div className="row">
          {(!isSmallScreen || (isSmallScreen && showFirstCard)) && (
            <div className={isSmallScreen ? "card-flex col-12" : "card-flex col-7"}>
              <div className="col-9 d-flex  flex-column alinhar">
                <div>
                  <img src="../src/assets/logocadastro.svg" />
                </div>
              </div>
            </div>
          )}
          {(!isSmallScreen || (isSmallScreen && !showFirstCard)) && (
            <div className={isSmallScreen ? "card-flex col-12" : "card-flex col-5 container-cad"}>
              <label className="titulo display">Cadastre-se</label>
              <div style={{ marginTop: "15px" }}>
                <label className="formulario marg">E-mail:</label>
                <input className={isSmallScreen ? "col-12" : "col-11 display c_text"} type="email" name="email" id="email" placeholder=" Digite seu email" required="" />
                <label className="formulario marg">Nome Completo:</label>
                <input className={isSmallScreen ? "col-12" : "col-11 display c_text"} type="text" name="nome" id="nome" placeholder=" Digite seu nome completo" required="" />
                <label className="formulario marg">Telefone:</label>
                <InputMask className={isSmallScreen ? "col-12" : "col-11 display c_text"} mask="(99) 99999-9999" placeholder=" Digite seu número de telefone" required="" />
                <label className="formulario marg">Senha:</label>
                <input className={isSmallScreen ? "col-12" : "col-11 display c_text"} type="password" name="password" id="password" placeholder=" Digite sua senha" />
                <label className="formulario marg">Confirmar senha</label>
                <input className={isSmallScreen ? "col-12" : "col-11 display c_text "} type="password" name="password" id="password" placeholder=" Confirmar senha" required="" />
                <div className="marg">
                  <button className={isSmallScreen ? "col-12" : "col-11 display c_text btn-cadastrar"}>Cadastrar</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CadastroUsuario;