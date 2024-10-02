import React, { useState } from 'react';

const NavbarAdm = () => {
  const tamanhoFonteInicial = 16;
  const cliquesMaximos = 4;

  const [tamanhoFonte, setTamanhoFonte] = useState(tamanhoFonteInicial);
  const [cliques, setCliques] = useState(0);

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

  return (
    <div className="flex " style={{ padding: 30, alignItems: "top", justifyContent: 'space-between', display: "flex", paddingBottom: 20 }}>
      <div>
        <ul className="nav nav-pills ">
          <li className="nav-item" >
            <a className="nav-link active m-1 " aria-current="page" href="#" style={{backgroundColor: "#58AFAE"}}>
              <img className="AcessibilidadeLuz w-[20px] h-[22px] "
             src="../src/assets/Iconeluz.svg" /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link active m-1" aria-current="page" href="#" style={{backgroundColor: "#58AFAE"}}>
              <img className="Acessibilidadedaltonico  w-[20px] h-[22px]" 
              src="../src/assets/iconeDaltonico.svg" /></a>
          </li>
          <li className="nav-item">
            <a className="nav-link active m-1" aria-current="page" href="#" style={{backgroundColor: "#58AFAE"}} onClick={aumentarFonte}>
              <img className="Acessibilidadefontemais w-[20px] h-[22px]" src="../src/assets/A+.svg" />
            </a>
          </li>
          <li className="nav-item">
            <a className=" nav-link active m-1" aria-current="page" href="#" style={{backgroundColor: "#58AFAE"}} onClick={resetarFonte}>
              <img className="Acessibilidadefonte w-[20px] h-[22px]" src="../src/assets/A-.svg" />
            </a>
          </li>
        </ul>
      </div>

      <form className="d-flex" role="search" style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '10px', padding: '5px', alignItems: "center", width: 380, height: 40, justifyContent: 'space-between', fontSize: `${tamanhoFonte}px` }}>
        <input
          type="text"
          style={{ paddingRight: 30, border: 'none', outline: 'none', borderRadius: '10px', width: 340 }}
          placeholder="Pesquisar"
        />
        <img
          src="../src/assets/iconePesquisa.svg"
          alt="Ícone"
          style={{ width: 30, height: 30, paddingRight: 10 }}
        />
      </form>
    </div>
  );
};

export default NavbarAdm;