import React from "react";

const Card = ({ link, imageSrc, title }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 ">
      <div className="max-w-sm flex-row rounded-lg justify-center items-center bg-[#FFD121] dark:bg-gray-800 dark:border-gray-700" >
        <a href={link}>
          <img className="rounded-t-lg w-full" src={imageSrc} alt="" />
        </a>
        <div className="flex flex-col justify-center items-center  p-2 rounded-lg h-10 bg-[#FFD121] ">
          <a href={link}>
            <h5 className="mb-2  text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
              {title}
            </h5>
          </a>
        </div>
      </div>
    </div>
  );
};

const CardHome = () => {
  return (
    <div className="flex flex-wrap">
      <Card link="./tipousuario" imageSrc="./src/assets/homeUsuario.png" title="Usuários" />
      <Card link="#" imageSrc="./src/assets/homeEmpresa.png" title="Empresas" />
      <Card link="./noticia" imageSrc="./src/assets/homeNoticia.png" title="Notícias" />
      <div style={{ width: "100%", height: 5 }}></div>
      <Card link="#" imageSrc="./src/assets/homeEvento.png" title="Eventos" />
      <Card link="./tipoatracao" imageSrc="./src/assets/homeAtracao.png" title="Atrações" />
      <Card link="./tipoturismo" imageSrc="./src/assets/homePontoTuristico.png" title="Pontos Turísticos" />
    </div>
  );
};

export default CardHome;
