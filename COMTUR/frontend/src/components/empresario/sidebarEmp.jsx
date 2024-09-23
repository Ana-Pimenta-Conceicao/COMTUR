import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Login from "../../assets/login.png";

const SidebarEmp = ({ setOpen, open, nomeUsuario }) => {
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
      try {
        await axios.post(baseUrl + "/Logout", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {}
    }
  };

  const Menus = [
    { title: "Dashboard", src: "Dashboard", iconSrc: "Dashboard" },
    { title: "Perfil", src: `perfil/${userId}`, iconSrc:  "PerfilEmp"},
    { title: "Avisos", src: "avisos", iconSrc: "avisos"},
    { title: "Empresas", src: "empresaEmp", iconSrc: "empresaEmp"},
    { title: "Anúncios", src: "anuncio", iconSrc: "anuncio" },
  ];

  return (
    <div className="sidebar fixed pr-20" style={{ height: "100vh" }}>
      <div
        className={` ${
          open ? "w-52" : "w-20"
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
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-lg duration-200 ${
              !open && "scale-0"
            }`}
          >
            {userName.length > 10 ? userName.substring(0, 9) + "..." : userName}
          </h1>
        </div>
        <ul className="pt-5" style={{ padding: 0, position: "relative" }}>
          {Menus.map((Menu, index) => (
            <>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 w-full
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  Menu.src === 1 && "bg-light-white"
                } `}
              >
                <Link
                  to={`/${Menu.src.toLowerCase()}`}
                  className="flex w-full text-inherit"
                >
                  <div className="flex items-center w-full">
                    <img src={`../src/assets/${Menu.iconSrc}.png`} />
                    <span
                      className={`flex ${
                        !open && "hidden"
                      } origin-left duration-200 pl-2 w-full`}
                    >
                      {Menu.title}
                    </span>
                  </div>
                </Link>
              </li>
            </>
          ))}
        </ul>
        <Link to="/login" onClick={handleLogout}>
          <ul
            className={`absolute bottom-1 rounded-md -ml-0.5 pl-2 py-2 ${
              !open && "w-[40px]"
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

export default SidebarEmp;