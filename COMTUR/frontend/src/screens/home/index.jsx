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
            <h1 className="text-2xl pb-10 font-semibold">
              Bem Vindo, Rodrigo Faro!
            </h1>

            <div
              className="flex flex-wrap"
              style={{ justifyContent: "space-between" }}
            >
              <div className="w-1/3 p-4">
                <div class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{  background: "#FFD121", justifyContent: "center", alignItems: "center", width: 295, height: 215 }}>
                  <a href="../noticia">
                    <img class="rounded-t-lg" src="./src/assets/menuUsuarios.png" alt="" />
                  </a>
                  <div class="p-2 rounded-lg"
                       style={{ background: "#FFD121", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                   <a href="../noticia">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Usuários
                      </h5>
                   </a>
                   </div>
                </div>
              </div>

              <div className="w-1/3 p-4">
                <div
                  class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 295,
                    height: 215,
                  }}
                >
                  <a href="#">
                    <img
                      class="rounded-t-lg" 
                      src="./src/assets/empresa.png"
                      alt=""
                    />
                  </a>
                  <div
                    class="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                       Empresas
                      </h5>
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-1/3 p-4 ">
                <div
                  class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 295,
                    height: 215,
                  }}
                >
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="./src/assets/menuUsuarios.png"
                      alt=""
                    />
                  </a>
                  <div
                    class="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Usuários
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", height: 20 }}></div>
              <div className="w-1/3 p-4">
                <div
                  class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 295,
                    height: 215,
                  }}
                >
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="./src/assets/menuUsuarios.png"
                      alt=""
                    />
                  </a>
                  <div
                    class="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Usuários
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div
                  class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 295,
                    height: 215,
                  }}
                >
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="./src/assets/menuUsuarios.png"
                      alt=""
                    />
                  </a>
                  <div
                    class="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Usuários
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-1/3 p-4">
                <div
                  class="max-w-sm flex-row rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  style={{
                    background: "#FFD121",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 295,
                    height: 215,
                  }}
                >
                  <a href="#">
                    <img
                      class="rounded-t-lg"
                      src="./src/assets/menuUsuarios.png"
                      alt=""
                    />
                  </a>
                  <div
                    class="p-2 rounded-lg"
                    style={{
                      background: "#FFD121",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <a href="#">
                      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Usuários
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
