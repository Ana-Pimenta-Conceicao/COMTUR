import React, { useState } from 'react';

const NavbarAdm = () => {
  const tamanhoFonteInicial = 16;
  const cliquesMaximos = 4;

  const [tamanhoFonte, setTamanhoFonte] = useState(tamanhoFonteInicial);
  const [cliques, setCliques] = useState(0);
  const [expandido, setExpandido] = useState(false); // Para as opções de acessibilidade
  const [expandirPesquisa, setExpandirPesquisa] = useState(false); // Para o campo de pesquisa

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

  const toggleExpandir = () => {
    setExpandido((prevExpandido) => !prevExpandido);
  };

  const toggleExpandirPesquisa = () => {
    setExpandirPesquisa((prev) => !prev);
  };

  return (
    <div className="flex flex-col md:flex-row pl-1 pt-3 md:p-[30px] items-start justify-between pb-[20px]">
      <div className="flex flex-col">
        <div onClick={toggleExpandir} style={{ cursor: 'pointer', marginBottom: '10px', marginTop:'5px' }}>
          <strong>Opções de Acessibilidade</strong>
        </div>
        {expandido && (
          <ul className="nav nav-pills flex">
            <li className="nav-item">
              <a className="nav-link active m-1" aria-current="page" href="#" style={{ backgroundColor: "#58AFAE" }}>
                <img className="AcessibilidadeLuz w-[20px] h-[22px]" src="../src/assets/Iconeluz.svg" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active m-1" aria-current="page" href="#" style={{ backgroundColor: "#58AFAE" }}>
                <img className="Acessibilidadedaltonico w-[20px] h-[22px]" src="../src/assets/iconeDaltonico.svg" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active m-1" aria-current="page" href="#" style={{ backgroundColor: "#58AFAE" }} onClick={aumentarFonte}>
                <img className="Acessibilidadefontemais w-[20px] h-[22px]" src="../src/assets/A+.svg" />
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active m-1" aria-current="page" href="#" style={{ backgroundColor: "#58AFAE" }} onClick={resetarFonte}>
                <img className="Acessibilidadefonte w-[20px] h-[22px]" src="../src/assets/A-.svg" />
              </a>
            </li>
          </ul>
        )}
      </div>

      <form className="flex gap-x-3 justify-start items-center " role="search">
        <input
          type="text"
          style={{
            paddingRight: 30,
            border: '1px solid #ccc',
            borderRadius: '10px',
            opacity: expandirPesquisa ? 1 : 0, // Controle de opacidade
            transition: 'width 0.3s ease, opacity 0.3s ease', // Animação suave
            height: 40,
            outline: 'none',
          }}
          className={`
              ${expandirPesquisa ? 'md:w-[340px]' : 'md:w-0'}
              ${expandirPesquisa ? 'md:pl-[10px]' : 'md:w-0'}
          `}
          placeholder="Pesquisar"
        />
        <img
          src="../src/assets/iconePesquisa.svg"
          alt="Ícone"
          style={{
            width: 35,
            height: 35,
            paddingRight: 10,
            cursor: 'pointer', // Cursor de ponteiro ao passar o mouse
          }}
          className=''
          onClick={toggleExpandirPesquisa} // Chama a função para expandir o campo de pesquisa
        />
      </form>
    </div>
  );
};

export default NavbarAdm;