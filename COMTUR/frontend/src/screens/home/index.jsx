import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Card } from "reactstrap";

const sidebarStyle = {
  width: "100%",
  height: "100vh", // 100% da altura da janela
};

const Home = () => {
  return (
    <div className="home h-auto">
      <div className="flex">
        <Sidebar style={sidebarStyle}/>
        <div className="flex-2 container-fluid">
          <Navbar />
          <div className="cont-home" style={{ paddingLeft: 50 }}>
            <h1 className="text-2xl pb-10 font-semibold">
              Bem Vindo, Rodrigo Faro!
            </h1>

            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="#">
                    <img
                      className="card-img-top rounded-t-lg"
                      src="./src/assets/homeUsuario.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="#">
                      <h5 className="card-title text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Usuários
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="#">
                    <img
                      className="card-img-top rounded-t-lg"
                      src="./src/assets/homeEmpresa.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="#">
                      <h5 className="card-title text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Empresas
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="./noticia">
                    <img
                      className="card-img-top rounded-t-lg"
                      src="./src/assets/homeNoticia.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="./noticia">
                      <h5 className="card-title text-2xl font-bold text-gray-900 dark:text-white text-center">
                        Notícias
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="#">
                    <img
                      class="card-img-top rounded-t-lg"
                      src="./src/assets/homeEvento.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        Eventos
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="./tipoatracao">
                    <img
                      class="card-img-top rounded-t-lg"
                      src="./src/assets/homeAtracao.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="./tipoatracao">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        Atrações
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card" style={{ background: "#FFD121" }}>
                  <a href="./tipoturismo">
                    <img
                      class="card-img-top rounded-t-lg"
                      src="./src/assets/homePontoTuristico.png"
                      alt=""
                    />
                  </a>
                  <div className="card-body">
                    <a href="./tipoturismo">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                        Pontos Turísticos
                      </h5>
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
