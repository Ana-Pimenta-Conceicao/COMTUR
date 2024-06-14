import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CaretRight } from "@phosphor-icons/react";
import Login from "../../assets/login.png";
import axios from "axios";

const SidebarAdm = ({ setOpen, open, nomeUsuario }) => {
  const [submenuOpen, setSubmenuOpen] = useState({});
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Buscar o nome do usuário do localStorage ao montar o componente
    const storedUserName = localStorage.getItem("nome");
    const storedUserId = localStorage.getItem("id");
    if (storedUserName) {
      setUserName(storedUserName);
      setUserId(storedUserId);
    }
  }, []);

  const handleLogout = async () => {
    const baseUrl = "https://localhost:7256/api/Login";

    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("token", token);

      localStorage.removeItem("token");
      localStorage.removeItem("tipoUsuario");
      localStorage.removeItem("nome");
      localStorage.removeItem("id");

      try {
        await axios.post(baseUrl + "/Logout", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Erro ao fazer logout:", error);
      }
    }

  };

  const Menus = [
    { title: "Início", src: "home", iconSrc: "Home", gap: true },
    { title: "Perfil", src: `perfil/${userId}`, iconSrc: "Perfil" },
    {
      title: "Usuários",
      src: "usuario",
      iconSrc: "Usuario",
      submenu: true,
      submenuItems: [
        { title: "Administradores", link: "/administrador" },
        { title: "Funcionários", link: "/funcionario" },
        { title: "Usuários Comuns", link: "/usuariocomum" },
        { title: "Empresários", link: "/empresario" },
      ],
    },
    { title: "Empresas", src: "empresa", iconSrc: "Empresa" },
    { title: "Eventos", src: "Eventos", iconSrc: "Eventos" },
    {
      title: "Turismos",
      src: "turismo",
      iconSrc: "Turismo",
      submenu: true,
      submenuItems: [
        { title: "Turismos", link: "/turismo" },
        { title: "Tipos de Turismos", link: "/tipoturismo" },
      ],
    },
    { title: "Notícias", src: "Noticia", iconSrc: "Noticia" },
    {
      title: "Atrações",
      src: "Atracao",
      iconSrc: "Atracao",
      submenu: true,
      submenuItems: [
        { title: "Atrações", link: "/atracao" },
        { title: "Tipos de Atrações", link: "/tipoatracao" },
      ],
    },
    { title: "Dashboard", src: "Dashboard", iconSrc: "Dashboard" },
  ];

  const toggleSubmenu = (index) => {
    setSubmenuOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="sidebar fixed pr-20" style={{ height: "100vh" }}>
      <div
        className={` ${open ? "w-52" : "w-20"
          } bg-black h-screen pl-5 pr-5 pt-8 relative duration-300`}
      >
        <img
          src="../src/assets/control.png"
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
            {userName.length > 10 ? userName.substring(0, 9) + "..." : userName}
          </h1>
        </div>
        <ul className="pt-6" style={{ padding: 0, position: "relative" }}>
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 w-full
              ${Menu.gap ? "mt-9" : "mt-2"} ${Menu.src === 1 && "bg-light-white"
                  } `}
              >
                <Link
                  to={`/${Menu.src.toLowerCase()}`}
                  className="flex w-full text-inherit"
                >
                  <div className="flex items-center w-full">
                    <img src={`../src/assets/${Menu.iconSrc}.png`} />
                    <span
                      className={`flex ${!open && "hidden"
                        } origin-left duration-200 pl-2 w-full`}
                      onClick={() => toggleSubmenu(index)}
                    >
                      {Menu.title}
                    </span>
                    {Menu.submenu && open && (
                      <CaretRight
                        size={15}
                        onClick={() => toggleSubmenu(index)}
                        className={`inline-flex ${open && "ml-[60px]"
                          } justify-end w-full ${submenuOpen[index] ? "rotate-90" : ""
                          } `}
                      />
                    )}
                  </div>
                </Link>
              </li>

              {Menu.submenu && submenuOpen[index] && open && (
                <ul>
                  {Menu.submenuItems.map((submenuItem, subIndex) => (
                    <li
                      key={subIndex}
                      className={`flex rounded-md p-2 cursor-pointer ml-7 hover:bg-light-white text-gray-300 text-xs items-center gap-x-4`}
                    >
                      <Link to={submenuItem.link}>{submenuItem.title}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
        <Link to="/login" onClick={handleLogout}>
          <ul
            className={`absolute bottom-1 rounded-md -ml-0.5 pl-2 py-2 ${!open && "w-[40px]"
              } w-[170px] flex items-center cursor-pointer hover:bg-light-white text-gray-300 text-sm`}
          >
            <img src={Login} alt="" className="mr-2" />
            <h1 className={`${!open && "hidden"}`}>Sair</h1>
          </ul>
        </Link>
      </div>
    </div>
  );
};

export default SidebarAdm;
