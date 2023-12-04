import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../../components/sidebar";
import Navbar from "../../components/navbar";
import { Card } from "reactstrap";

const Home = () => {
  return (
    <div className="home">
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-2 container-fluid">
          <Navbar />

          <div className="cont-home" style={{ paddingLeft: 50 }}>
            <h1 className="text-2xl font-semibold">
              Bem Vindo, Rodrigo Faro!
            </h1>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="./empresario">
                    <img
                      className="rounded-t-lg w-full"
                      src="./src/assets/homeUsuario.png"
                      alt=""
                    />
                  </a>
                  <div
                    className="p-2 rounded-lg h-10"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    
                    }}
                  >
                    <a href="./empresario">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                        Empresários
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="#">
                    <img
                      className="rounded-t-lg w-full"
                      src="./src/assets/homeEmpresa.png"
                      alt="Empresas"

                    />
                  </a>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40,
                    }}
                  >
                    <a href="#">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                        Empresas
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="./noticia">
                    <img
                      className="rounded-t-lg w-full"
                      src="./src/assets/homeNoticia.png"
                      alt=""
                    />
                  </a>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40,
                    }}
                  >
                    <a href="./noticia">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                        Notícias
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div style={{ width: "100%", height: 5 }}></div>

              <div className="w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="#">
                    <img
                      className="w-full rounded-t-lg"
                      src="./src/assets/homeEvento.png"
                      alt=""
                    />
                  </a>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40
                    }}
                  >
                    <a href="#">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                        Eventos
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="./tipoatracao">
                    <img
                      className=" w-full rounded-t-lg"
                      src="./src/assets/homeAtracao.png"
                      alt=""
                    />
                  </a>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40
                    }}
                  >
                    <a href="./tipoatracao">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                        Atrações
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/2 lg:w-1/3 p-4">
                <div
                  className="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                  }}
                >
                  <a href="./tipoturismo">
                    <img
                      className=" w-full rounded-t-lg"
                      src="./src/assets/homePontoTuristico.png"
                      alt=""
                    />
                  </a>
                  <div
                    className="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 40
                    }}
                  >
                    <a href="./tipoturismo">
                      <h5 className="mb-2 pt-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
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
