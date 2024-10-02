import React from "react";

const Card = ({ link, imageSrc, title, imageAlt }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 ">
      <div className="max-w-sm flex-row rounded-lg justify-center items-center bg-[#064D56] dark:bg-gray-800 dark:border-gray-700 shadow-md hover:transition-opacity hover:scale-105" >
        <a href={link}>
          <img className="rounded-t-lg w-full" src={imageSrc} alt={imageAlt} />
        </a>
        <div className="flex flex-col justify-center items-center h-12 p-2 rounded-b-lg bg-[#064D56]">
          <a href={link}>
            <h5 className="justify-center items-center text-2xl font-medium tracking-tight text-white ">
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
      <Card link="./usuario" imageSrc="./src/assets/homeUsuario.png" title="Usuários" imageAlt="Imagem que redireciona para a página inicial dos usuários" />
      <Card link="/empresa" imageSrc="./src/assets/homeEmpresa.png" title="Empresas" imageAlt="Imagem que redireciona para a página de empresas" />
      <Card link="./noticia" imageSrc="./src/assets/homeNoticia.png" title="Notícias" imageAlt="Imagem que redireciona para a página de notícias" />
      <div className="w-full h-[5px]"></div>
      <Card link="#" imageSrc="./src/assets/homeEvento.png" title="Eventos" imageAlt="Imagem que redireciona para a página de eventos" />
      <Card link="./atracao" imageSrc="./src/assets/homeAtracao.png" title="Atrações" imageAlt="Imagem que redireciona para a página de tipo de atrações" />
      <Card link="./turismo" imageSrc="./src/assets/homePontoTuristico.png" title="Pontos Turísticos" imageAlt="Imagem que redireciona para a página de tipo de turismos" />
    </div>
  );
};

export default CardHome;
