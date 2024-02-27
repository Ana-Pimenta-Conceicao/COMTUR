import SidebarAdm from "../../components/sidebarAdm";
import NavBarAdm from "../../components/navbarAdm";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { Button } from "bootstrap";
import { CaretLeft, CaretRight, Eye, EyeSlash, Trash, FilePlus, Pencil } from "@phosphor-icons/react";

export default function PerfilAdministrador() {
    const { id } = useParams();
    const [administrador, setAdministrador] = useState(null);
    const baseUrl = "https://localhost:7256/api/Administrador";

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="h-screen flex">
            <SidebarAdm />
            <div className="flex-2 container-fluid">
                <NavBarAdm />
                <div className="pl-8 pr-8 pt-[20px]">
                    <h1 className="text-3xl font-semibold pb-2">Bem vindo, Rodrigo Faro!</h1>
                    <hr className="pb-[30px] border-[2.5px] border-[#DBDBDB]" />
                </div>
                <div className="grid grid-cols-4">
                    <div className="pl-28 col-span-1 ">
                        <img className="flex w-40 h-40 rounded-full" src="./src/assets/PU.jpg" alt="Imagem" />
                        <h2 className="pt-2 pl-5 text-lg font-bold justify-end pb-2">Rodrigo Faro</h2>
                        <button className="bg-[#f5f5f5] hover:bg-[#FFD121] text-base font-semibold rounded-md w-[192px] ">Editar Perfil</button>
                    </div>

                    <div className="flex flex-col col-span-3 pl-20 form-group ">
                        <label className="text-sm font-semibold">ID: </label>
                        <input
                            type="text"
                            className="form-control text-sm mb-2 w-[300px]"
                            readOnly
                            value={"000000"}
                        />
                        <label className="text-sm font-semibold">Nome: </label>
                        <input
                            type="text"
                            className="form-control text-sm mb-2  w-[300px]"
                            onChange={(e) => setNomeAdmin(e.target.value)}
                            value={"Nome do Administrador"}
                        />
                        <label className="text-sm font-semibold">Cargo:</label>
                        <input
                            type="text"
                            className="form-control text-sm mb-2 w-[300px]"
                            onChange={(e) => setCargoAdmin(e.target.value)}
                            value={"Cargo do Administrador"}
                        />
                        <label className="text-sm font-semibold">CPF:</label>
                        <InputMask
                            mask="999.999.999-99"
                            maskPlaceholder="999.999.999-99"
                            type="text"
                            className="form-control text-sm mb-2  w-[300px]"
                            onChange={(e) => setCpfAdmin(e.target.value)}
                            value={"000.000.000-00"}
                        />
                        <label className="text-sm font-semibold">Telefone:</label>
                        <InputMask
                            mask="(99) 99999-9999"
                            maskPlaceholder="(99) 99999-9999"
                            type="text"
                            className="form-control text-sm mb-2 w-[300px]"
                            onChange={(e) => setTelefoneAdmin(e.target.value)}
                            value={"(11) 11111-1111"}
                        />
                        <label className="text-sm font-semibold">Email:</label>
                        <input
                            type="text"
                            className="form-control text-sm mb-2 w-[300px]"
                            onChange={(e) => setEmailAdmin(e.target.value)}
                            value={"administrador@gmail.com"}
                        />
                        <label className="text-sm font-semibold">Senha:</label>
                        <div className="input-group h-8 w-[300px]">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control text-sm mb-4 h-8"
                                onChange={(e) => setSenhaAdmin(e.target.value)}
                                value={"admin@senha123"}
                            />
                            <button
                                className="btn btn-outline-secondary bg-[#DBDBDB] border-[#DBDBDB]
                                 hover:bg-gray-300 hover:border-gray-300 h-8"
                                type="button"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
