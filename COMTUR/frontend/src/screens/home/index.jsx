import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm";
import NavbarAdm from "../../components/admin/navbarAdm";

const Home = () => {
  return (
    <div className="home">
      <div className="h-screen flex">
        <SidebarAdm />
        <div className="flex-2 container-fluid">
          <NavbarAdm />
          <div className="cont-home pl-[50px]">
            <div className="text-2xl font-semibold">
              Bem Vindo, Rodrigo Faro!
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="./empresario">
                    <img className="rounded-t-lg w-full" src="./src/assets/homeUsuario.png" alt="Tela principal do empresário" />
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="./empresario">
                      <div className="text-2xl font-bold tracking-tight">
                        Empresários
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="#">
                    <img className="rounded-t-lg w-full" src="./src/assets/homeEmpresa.png" alt="Teça Principal de Empresas" />
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="#">
                      <div className="text-2xl font-bold tracking-tight">
                        Empresas
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="./noticia">
                    <img className="rounded-t-lg w-full" src="./src/assets/homeNoticia.png" alt="Tela Principal de Noticias" />
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="./noticia">
                      <div className="text-2xl font-bold tracking-tight ">
                        Notícias
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full h-[5px]"></div>

              <div className="w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="#">
                    <img className="w-full rounded-t-lg" src="./src/assets/homeEvento.png" alt="Tela Principal de Eventos"/>
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="#">
                      <div className="text-2xl font-bold tracking-tight">
                        Eventos
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="./tipoatracao">
                    <img className=" w-full rounded-t-lg" src="./src/assets/homeAtracao.png" alt="Tela Principal de Atrações" />
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="./tipoatracao">
                      <div className="text-2xl font-bold tracking-tight">
                        Atrações
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 p-4">
                <div className="max-w-sm flex-row justify-center items-center h-[200px] rounded-lg shadow bg-[#FFD121]">
                  <a href="./tipoturismo">
                    <img className=" w-full rounded-t-lg" src="./src/assets/homePontoTuristico.png" alt="Tela Principal de Pontos Turísticos"/>
                  </a>
                  <div className="flex flex-col justify-center items-center bg-[#FFD121] rounded-b-lg h-10">
                    <a href="./tipoturismo">
                      <div className="text-2xl font-bold tracking-tight">
                        Pontos Turísticos
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
