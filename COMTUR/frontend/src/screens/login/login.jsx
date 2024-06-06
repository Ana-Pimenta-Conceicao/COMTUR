import { Eye, EyeSlash, ArrowLeft } from "@phosphor-icons/react";
import logoComturSF from "../../assets/logoSF.svg";
import comturBranco from "../../assets/comturBranco.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputMask from "react-input-mask";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const baseUrl = "https://localhost:7256/api/Login";

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erroLogin, setErroLogin] = useState("");
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRotated, setIsRotated] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const rotateLogo = () => {
    setIsRotated(!isRotated);
  };
  const determinarRota = (tipoUsuario) => {
    switch (tipoUsuario) {
      case 1: //usuario comum
        return "/";
      case 2: // funcionário
        return "/home";
      case 3: //empresario
        return "/homeEmpresario";
      case 4: //adm
        return "/home";
      default:
        return "/login";
    }
  };

  const login = async () => {
    setErroLogin("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("senha", senha);

    try {
      const response = await axios.post(baseUrl + "/Login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      if (response.data.autentication) {
        console.log(2);
        localStorage.setItem("token", response.data.message.tokenUsuario);
        localStorage.setItem("tipoUsuario", response.data.message.tipoUsuario);
        localStorage.setItem("nome", response.data.message.nome);
        localStorage.setItem("id", response.data.message.id);

        console.log(localStorage.getItem("token"));
        console.log(localStorage.getItem("id"));
        navigate(determinarRota(response.data.message.tipoUsuario));
      } else {
        console.log(3);
        setErroLogin(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErroLogin(error.response.data.message);
    }
  };

  return (
    <div className="bg-black w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full h-full">
        <div
          className="flex flex-row text-lg text-white pt-4 pl-2"
          onClick={() => {
            navigate(`/`);
          }}
        >
          <ArrowLeft className="mr-3" size={26} />
          Voltar
        </div>
        <div className="flex flex-col pt-5 justify-center items-center">
          <img
            src={comturBranco}
            alt="Comtur Branco"
            className="lg:hidden w-[180px]"
          />

          <div className="flex flex-row justify-center items-center w-full  md:w-auto h-full mt-3 sm:ml-40">
            {/* <div className={` ${showSignupForm ? 'hidden sm:w-full' : 'sm:w-full'}`}> */}
            <div
              className={`flex flex-col md:flex-col ${
                showSignupForm ? "hidden sm:w-full" : " sm:flex"
              }`}
            >
              {!showSignupForm && (
                <div className="w-full">
                  <div className=" bg-white sm:mr-24  w-[300px] lg:w-[400px] h-[480px] ml-2  mt-4 rounded-2xl">
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
                          aria-required="true"
                          aria-label="E-mail obrigatório"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label
                          htmlFor="password"
                          className="font-semibold pt-4"
                        >
                          Senha:
                        </label>
                        <br />
                        <div className="flex flex-row input-group w-full">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="border-1 pl-3 rounded-md w-[80%]  h-[40px]"
                            placeholder="Digite a senha"
                            required
                            aria-required="true"
                            aria-label="Senha obrigatória"
                            onChange={(e) => setSenha(e.target.value)}
                          />
                          <button
                            className="btn flex w-[20%] h-[40px] justify-center bg-white text-black  border-y-[#DBDBDB] border-r-[#DBDBDB] hover:text-[#FFD121] "
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeSlash size={32} />
                            ) : (
                              <Eye size={30} />
                            )}
                          </button>
                        </div>
                      </div>

                      <label htmlFor="erro" className="font-semibold pt-4">
                        {erroLogin}
                      </label>

                      <div className="flex flex-col w-full justify-center pt-4 px-4">
                        <button
                          className="text-white text-lg bg-black w-full h-[50px] rounded-md"
                          onClick={(e) => login()}
                        >
                          Entrar
                        </button>
                      </div>

                      <div className="flex flex-col items-center pt-2 sm:text-lg text-sm">
                        <h2 className="text-gray-500">
                          Ainda não tem uma conta?
                        </h2>

                        <button
                          className="uppercase underline font-bold text-black text-lg w-full h-[50px] rounded-md"
                          onClick={() => setShowSignupForm(true)}
                        >
                          Cadastre-se
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* <div className="flex flex-row w-full justify-center items-center">
              <div className=" w-full md:w-auto h-screen justify-center items-center"></div> */}
            {!showSignupForm && (
  <img
    src={logoComturSF}
    alt="Logo"
    className={`logo-image lg:ml-32 w-[450px] cursor-pointer duration-500 ${isRotated ? "rotate-[360deg]" : ""} hidden md:block`}
    onClick={rotateLogo}
  />
)}
          </div>

          {/* Divisão entre os forms */}

          <div className="flex flex-row justify-center items-center w-full  md:w-auto h-full  sm:ml-40">
            {/* Adicionada condição para exibir ou ocultar o formulário de cadastro */}
            {showSignupForm && (
              <img
                src={logoComturSF}
                alt="Logo"
                className={`logo-image sm:ml-32  w-[450px] cursor-pointer duration-500 ${
                  isRotated ? "rotate-[360deg]" : ""
                } hidden sm:block`}
                onClick={rotateLogo}
              />
            )}

            <div
              className={`flex flex-col ${
                showSignupForm ? "sm:flex" : "hidden sm:w-full"
              }`}
            >
              {/* Formulário de cadastro */}
              {showSignupForm && (
                <div className="flex w-full">
                  <div className="flex bg-white sm:mr-24 sm:w-[450px] w-[300px] h-[600px] ml-2 sm:ml-24 mt-4 rounded-2xl">
                    <div className="">
                      <h1 className="text-xl font-light pl-4 pt-3 tracking-normal">
                        É bom ter você por aqui!
                      </h1>
                      <h1 className="text-2xl font-semibold pl-4 pt-2 tracking-wide">
                        Efetuar Cadastro
                      </h1>
                      <div className="pl-5 pr-5 pt-1">
                        <label htmlFor="email" className="font-semibold pt-2">
                          Nome Completo:
                        </label>
                        <br />
                        <input
                          id="email"
                          className="border-1 pl-3 rounded-md w-full h-[40px]"
                          type="email"
                          name="email"
                          placeholder="Digite seu nome"
                          required
                          aria-required="true"
                          aria-label="E-mail obrigatório"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />

                        <label className="font-semibold pt-2">Telefone:</label>
                        <br />
                        <InputMask
                          mask="(99) 99999-9999"
                          maskPlaceholder="(99) 99999-9999"
                          type="text "
                          className="border-1 pl-3 rounded-md w-full h-[40px]"
                          // onChange={(e) => setTelefone(e.target.value)}
                          placeholder="Digite apenas números"
                        />
                        <br />
                        <label htmlFor="email" className="font-semibold pt-2">
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
                          aria-required="true"
                          aria-label="E-mail obrigatório"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <label
                          htmlFor="password"
                          className="font-semibold pt-2"
                        >
                          Senha:
                        </label>
                        <br />
                        <div className="flex flex-row input-group w-full rounded-md">
                          <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className="border-1 pl-3 rounded-md w-[80%]  h-[40px]"
                            placeholder="Digite a senha"
                            required
                            aria-required="true"
                            aria-label="Senha obrigatória"
                            onChange={(e) => setSenha(e.target.value)}
                          />
                          <button
                            className="btn flex w-[20%] h-[40px] justify-center rounded-md bg-white text-black  border-y-[#DBDBDB] border-r-[#DBDBDB] hover:text-[#FFD121] "
                            type="button"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeSlash size={32} />
                            ) : (
                              <Eye size={30} />
                            )}
                          </button>

                          <label
                            htmlFor="password"
                            className="font-semibold pt-2"
                          >
                            Confirme sua Senha:
                          </label>
                          <br />
                          <div className="flex flex-row input-group w-full">
                            <input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              className="border-1 pl-3 rounded-md w-[80%]  h-[40px]"
                              placeholder="Digite a senha"
                              required
                              aria-required="true"
                              aria-label="Senha obrigatória"
                              onChange={(e) => setSenha(e.target.value)}
                            />
                            <button
                              className="btn flex w-[20%] h-[40px] justify-center bg-white text-black  border-y-[#DBDBDB] border-r-[#DBDBDB] hover:text-[#FFD121] "
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <EyeSlash size={32} />
                              ) : (
                                <Eye size={30} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col w-full justify-center pt-4 px-4">
                        <button
                          className="text-white text-lg bg-black w-full h-[50px] rounded-md"
                          onClick={(e) => cadastro()}
                        >
                          Cadastrar
                        </button>
                      </div>

                      <div className="flex flex-col items-center pt-1 sm:text-lg text-sm">
                        <h2 className="text-gray-500">Já tenho uma conta</h2>

                        <button
                          className="uppercase underline font-bold text-black text-lg w-full h-[50px] rounded-md"
                          onClick={() => setShowSignupForm(false)}
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
