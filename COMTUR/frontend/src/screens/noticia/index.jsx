import { useState } from "react";
import '../../index.css';
import Telas from './Telas'

const Noticia = () => {
  
  const [open, setOpen] = useState(true);

  const Menus = [
    { title: "Usuário", src: "User" },
    { title: "Ponto Turístico", src: "Chat" },
    { title: "Eventos", src: "User", gap: true },
    { title: "Atrações ", src: "Calendar" },
    { title: "Notícia", src: "Search" },
    { title: "Dashboard", src: "Chart_fill" },
  ];

  return (
    <div className="flex">
      <div
        className={` ${open ? "w-30" : "w-20"
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
            src="./src/assets/logo.png"
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
              className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"
                } `}
            >
              <img src={`./src/assets/${Menu.src}.png`} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Telas />
    </div>
  );
};
export default Noticia;