import React, { useState } from "react";
import { Eye, EyeSlash, ArrowLeft } from "@phosphor-icons/react";
import logoComturSF from "../../assets/logoSF.svg";
import comturBranco from "../../assets/comturBranco.svg";

export default function CadastroUsuario() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const rotateLogo = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="bg-black w-full min-h-screen">
      <div className="flex flex-col md:flex-row h-full">
          <div className="flex flex-row text-lg text-white pt-4 pl-8">
          <ArrowLeft className="mr-3" size={26} />
            Voltar
          </div>
        <div className="flex flex-col w-full md:w-auto pt-5 justify-center items-center sm:ml-32">

          <img
            src={comturBranco}
            alt="Comtur Branco"
            className="sm:hidden block w-[180px] pt-4"
          />

          <div className="bg-white sm:w-[450px] w-[300px] h-[450px] ml-2 sm:ml-48  mt-4 rounded-2xl">
            <div className="">
              <h1 className="text-xl font-light pl-4 pt-4 tracking-normal">
                Bem Vindo de Volta!
              </h1>
              <h1 className="text-2xl font-semibold pl-4 pt-3 tracking-wide">
                Efetuar Login
              </h1>
              <div className="pl-5 pr-5 pt-1">
                <label htmlFor="email" className="font-semibold pt-4">
                  E-mail:
                </label>
                <br />
                <input
                  id="email"
                  className="border-1 pl-3 rounded-md w-full h-[40px]"
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  required
                />
                <br />
                <label htmlFor="password" className="font-semibold pt-4">
                  Senha:
                </label>
                <br />
                <div className="flex flex-row input-group w-full">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="border-1 pl-3 rounded-md w-[80%]  h-[40px]"
                    placeholder="Digite a senha"
                  />
                  <button
                    className="btn flex w-[20%] h-[40px] justify-center bg-white text-black  border-y-[#DBDBDB] border-r-[#DBDBDB] hover:text-[#FFD121] "
                    type="button"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlash size={32} /> : <Eye size={30} />}
                  </button>
                </div>
              </div>

             

              <div className="flex flex-col w-full justify-center pt-4 px-4">
                <button className="text-white text-lg bg-black w-full h-[50px] rounded-md">
                  Entrar
                </button>
              </div>

              <div className="flex flex-col items-center pt-2 sm:text-lg text-sm">
                <h2 className="text-gray-500">Ainda não tem uma conta?</h2>
                <h2 className="uppercase underline font-bold">Cadastre-se</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block w-full justify-center">
          <div className="flex w-full md:w-auto h-screen justify-center items-center">
            <div className="flex flex-col sm:ml-48 w-full justify-center items-center ">
              <img
                src={logoComturSF}
                alt="Logo"
                className={`w-[400px] cursor-pointer duration-500 ${
                  isRotated ? "rotate-[360deg]" : ""
                }`}
                onClick={rotateLogo}
              />
              <img
                src={comturBranco}
                alt="Comtur Branco"
                className="w-[200px] pt-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
