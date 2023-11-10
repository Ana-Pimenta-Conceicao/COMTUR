import React, { useState } from 'react';

const Navbar = () => {
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
    <div className="flex" style={{ padding: 30, alignItems: "top", justifyContent: 'space-between', display: "flex", paddingBottom: 100 }}>
      <div>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="itemacessibi nav-link active m-1" aria-current="page" href="#"><img className="AcessibilidadeLuz" style={{ width: 20, height: 22 }} src="./src/assets/Iconeluz.svg" /></a>
          </li>
          <li className="nav-item">
            <a className="itemacessibi nav-link active m-1" aria-current="page" href="#"><img className="Acessibilidadedaltonico" style={{ width: 20, height: 22 }} src="./src/assets/iconeDaltonico.svg" /></a>
          </li>
          <li className="nav-item">
            <a className="itemacessibi nav-link active m-1" aria-current="page" href="#" onClick={aumentarFonte}>
              <img className="Acessibilidadefontemais" style={{ width: 20, height: 22 }} src="./src/assets/A+.svg" />
            </a>
          </li>
          <li className="nav-item">
            <a className="itemacessibi nav-link active m-1" aria-current="page" href="#" onClick={resetarFonte}>
              <img className="Acessibilidadefonte" style={{ width: 20, height: 22 }} src="./src/assets/A-.svg" />
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
          src="./src/assets/iconePesquisa.svg"
          alt="Ícone"
          style={{ width: 30, height: 30, paddingRight: 10 }}
        />
      </form>

      <img className="LocomarcaComtur" style={{ width: 150, height: 50, padding: 5 }} src="./src/assets/iconeComtur.svg" />
    </div>
  );
};

export default Navbar;