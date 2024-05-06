import React from 'react'

const Card = ({ link, imageSrc, title, imageAlt }) => {
    return (
        <div className="transition justify-center items-center ease-in-out hover:scale-105 hover:delay-250 h-full max-w-sm flex-row rounded-xl
        shadow bg-[#FFD121]">
         <a href={link}>
             <img className="rounded-t-lg w-full h-[200px]" src={imageSrc} alt={imageAlt} />
         </a>
         <div className="flex flex-col justify-center items-center h-12 p-2 rounded-b-lg bg-[#FFD121]">
             <a href={link}>
                 <h5 className="justify-center items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                     {title}
                 </h5>
             </a>
         </div>
     </div>
    );
  };

const CardTipoUsuario = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
        <Card link="./administrador" imageSrc="./src/assets/cardAdm.jpg" title="Administrador" imageAlt="Imagem que redireciona para a página de administrador" />
        <Card link="./empresario" imageSrc="./src/assets/cardEmp.jpg" title="Empresários" imageAlt="Imagem que redireciona para a página de empresários" />
        <Card link="./usuario" imageSrc="./src/assets/cardAdm.jpg" title="Usuários Comum" imageAlt="Imagem que redireciona para a página de usuários comuns" />
    </div>
  )
}

export default CardTipoUsuario;