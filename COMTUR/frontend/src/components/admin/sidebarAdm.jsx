import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { CaretRight } from "@phosphor-icons/react";
import Login from "../../assets/login.png"

const SidebarAdm = ({ setOpen, open }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Início", src: "Home", gap: true },
    { title: "Perfil", src: "perfilAdministrador" },
    {
      title: "Usuários", src: "tipousuario",
      submenu: true,
      submenuItems: [
        { title: "Administrador" },
        { title: "Empresário" },
        { title: "Usuário Comum" },
      ],
    },
    { title: "Ponto Turístico", src: "tipoTurismo" },
    { title: "Eventos", src: "iconeEventos" },
    { title: "Atrações ", src: "tipoAtracao" },
    { title: "Notícia", src: "Noticia" },
    { title: "Dashboard", src: "iconeDashboard" },
  ];

  return (
    <div className="sidebar fixed pr-20" style={{ height: '100vh' }}>
      <div
        className={` ${open ? "w-52" : "w-20"
          } bg-black h-screen pl-5 pr-5 pt-8 relative duration-300`}
      >
        <img
          src=" ../src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180 "}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="../src/assets/logoComturSF.png"
            className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
              }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
              }`}
          >
            "Nome Usuario"
          </h1>
        </div>
        <ul className="pt-6" style={{ padding: 0, position: 'relative' }} >
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 w-full
              ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.src === 1 && "bg-light-white"
                  } `}
              >
                <Link to={`/${Menu.src.toLowerCase()}`} className="flex w-full text-inherit">
                  <div className="flex items-center w-full">
                    <img src={`../src/assets/${Menu.src}.png`} />
                    <span className={`flex ${!open && "hidden"} origin-left duration-200 pl-2 w-full`}>
                      {Menu.title}
                    </span>
                    {Menu.submenu && open && (
                      <CaretRight size={15}
                        onClick={() => setSubmenuOpen(!submenuOpen)}
                        className={`inline-flex ${open && "ml-[60px]"} justify-end w-full ${submenuOpen && "rotate-90"} `}
                      />
                    )}
                  </div>
                </Link>
              </li>

              {Menu.submenu && submenuOpen && open && (
                <ul>
                  {Menu.submenuItems.map((submenuItem, index) => (
                    <li key={index}
                      className={`flex rounded-md p-2 cursor-pointer px-4 hover:bg-light-white text-gray-300 text-xs items-center gap-x-4`}
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
        <Link to="/login">
          <ul className={`absolute bottom-1 rounded-md -ml-0.5 pl-2 py-2 ${!open && "w-[40px]"} w-[170px] flex items-center cursor-pointer hover:bg-light-white text-gray-300 text-sm`}>
            <img src={Login} alt="" className="mr-2" />
            <h1 className={`${!open && "hidden"}`}>
              Sair
            </h1>
          </ul>
        </Link>
      </div>
    </div >
  );
}

export default SidebarAdm;