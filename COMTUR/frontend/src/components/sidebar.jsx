import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const Sidebar = () => {

  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Início", src: "Home" , gap:true},
    { title: "Usuário", src: "iconeUser" },
    { title: "Ponto Turístico", src: "tipoTurismo" },
    { title: "Eventos", src: "iconeEventos" },
    { title: "Atrações ", src: "tipoAtracao" },
    { title: "Notícia", src: "Noticia" },
    { title: "Dashboard", src: "iconeDashboard" },
  ];

  return (
    <div className="sidebar" style={{ height: '100vh' }}>
      <div
        className={` ${open ? "w-52" : "w-20"
          } bg-black h-screen pl-5 pr-5  pt-8 relative duration-300`}
      >
        <img
          src="./src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="./src/assets/logoComturSF.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            Rodrigo Faro
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            >
              <Link to={`/${Menu.src.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit'}}>
                <div className="flex items-center">
                  <img src={`./src/assets/${Menu.src}.png`}/>
                  <span className={`${!open && "hidden"} origin-left duration-200 pl-2`}>
                    {Menu.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default Sidebar;