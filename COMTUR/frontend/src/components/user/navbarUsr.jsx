import React, { useState } from 'react';
import "../user/folhasyle.css";
import iconePesquisa from "../../assets/iconePesquisa.svg";
import logoNavUsr from "../../assets/logoNavUser.png"

const NavbarUsr = () => {
  const tamanhoFonteInicial = 16;
  const cliquesMaximos = 4;

  const [tamanhoFonte, setTamanhoFonte] = useState(tamanhoFonteInicial);
  const [cliques, setCliques] = useState(0);
  const [botaoSelecionado, setBotaoSelecionado] = useState(3); // Início selecionado inicialmente

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

  return (
    <div class="container-fluid" style={{ margin: 0, width: "100%", padding: 0 }}>
      <nav class="navbar navbar-expand-lg bg-black p-0 teste" data-bs-theme="dark">

        <nav class="navbar bg-black ml-5">
          <div class="container">
            <a class="navbar-brand ml-2" href="#">
              <img src={logoNavUsr} alt="lovo" width="47" height="46" />
            </a>
          </div>
        </nav>

        <nav class="navbar navbar-expand-lg bg-black p-0">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse mt-1" id="navbarSupportedContent">
              <form class="d-flex bg-white ml-5" role="search" style={{ display: 'flex', border: '1px solid #ccc', borderRadius: '10px', padding: '5px', alignItems: "center", width: 380, height: 40, justifyContent: 'space-between' }}>
                <input class="bg-white" type="text" style={{ paddingRight: 30, border: 'none', outline: 'none', borderRadius: '10px', width: 340 }} placeholder="Pesquisar" />
                <img src={iconePesquisa} alt="ÍconePesquisa" style={{ width: 30, height: 30, paddingRight: 10 }} />
              </form>



              <div class="btn-group grupobotoes ml-5 mt-1" role="group">
                <input type="radio" class={`btn-check ${botaoSelecionado === 1 ? 'amarelocheck' : ''}`} name="btnradio" id="btnradio1" autocomplete="off" checked={botaoSelecionado === 1} onChange={() => handleBotaoSelecionado(1)} />
                <label class={`btn btnmenunav ml-12 ${botaoSelecionado === 1 ? 'btn-outline-warning' : 'btn-outline-black'}`} for="btnradio1">Início</label>

                <input type="radio" class={`btn-check ${botaoSelecionado === 2 ? 'amarelocheck' : ''}`} name="btnradio" id="btnradio2" autocomplete="off" checked={botaoSelecionado === 2} onChange={() => handleBotaoSelecionado(2)} />
                <label class={`btn btnmenunav ${botaoSelecionado === 2 ? 'btn-outline-warning' : 'btn-outline-black'}`} for="btnradio2">Turismo</label>

                <input type="radio" class={`btn-check ${botaoSelecionado === 3 ? 'amarelocheck' : ''}`} name="btnradio" id="btnradio3" autocomplete="off" checked={botaoSelecionado === 3} onChange={() => handleBotaoSelecionado(3)} />
                <label class={`btn btnmenunav ${botaoSelecionado === 3 ? 'btn-outline-warning' : 'btn-outline-black'}`} for="btnradio3">Eventos</label>

                <input type="radio" class={`btn-check ${botaoSelecionado === 4 ? 'amarelocheck' : ''}`} name="btnradio" id="btnradio4" autocomplete="off" checked={botaoSelecionado === 4} onChange={() => handleBotaoSelecionado(4)} />
                <label class={`btn btnmenunav ${botaoSelecionado === 4 ? 'btn-outline-warning' : 'btn-outline-black'}`} for="btnradio4">Empresa</label>

                <input type="radio" class={`btn-check ${botaoSelecionado === 5 ? 'amarelocheck' : ''}`} name="btnradio" id="btnradio5" autocomplete="off" checked={botaoSelecionado === 5} onChange={() => handleBotaoSelecionado(5)} />
                <label class={`btn btnmenunav mr-1 ${botaoSelecionado === 5 ? 'btn-outline-warning' : 'btn-outline-black'}`} for="btnradio5">Notícias</label>





              </div>

              <label class="btn btnmenulogin btn-warning ml-5 mt-1" for="Acessar">Entrar/Cadastrar</label>


            </div>
          </div>
        </nav>

      </nav>
    </div>
  );
};

export default NavbarUsr;
