import React from "react";
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/sidebarAdm";
import NavBarAdm from "../../components/navbarAdm";
import { CaretLeft, CaretRight, Eye, EyeSlash, Trash, FilePlus, Pencil } from "@phosphor-icons/react";

export default function TipoUsuario() {

    return (

        <div className="h-screen flex">
            <SidebarAdm />
            <div className="flex-2 container-fluid">
                <NavBarAdm />
                <div className="pl-8 pr-8 pt-[20px]">
                    <h1 className="text-3xl font-semibold pb-2">Usuários</h1>
                    <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                    <div className="grid grid-cols-3 gap-4">
                        <div className="transition justify-center items-center ease-in-out hover:scale-105 hover:delay-250 h-full max-w-sm flex-row rounded-xl
                           shadow bg-[#FFD121]">
                            <a href="./administrador">
                                <img className="rounded-t-lg w-full h-[200px]" src="./src/assets/cardAdm.jpg" alt="" />
                            </a>
                            <div className="flex flex-col justify-center items-center h-12 p-2 rounded-b-lg bg-[#FFD121]">
                                <a href="./administrador">
                                    <h5 className="justify-center items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                        Administradores
                                    </h5>
                                </a>
                            </div>
                        </div>

                        <div className="transition justify-center items-center ease-in-out hover:scale-105 hover:delay-250 h-full max-w-sm flex-row rounded-xl
                           shadow bg-[#FFD121]">
                            <a href="./empresario">
                                <img className="rounded-t-lg w-full h-[200px]" src="./src/assets/cardEmp.jpg" alt="" />
                            </a>
                            <div className="flex flex-col justify-center items-center h-12 p-2 rounded-b-lg bg-[#FFD121]">
                                <a href="./empresario">
                                    <h5 className="justify-center items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                        Empresários
                                    </h5>
                                </a>
                            </div>
                        </div>

                        <div className="transition justify-center items-center ease-in-out hover:scale-105 hover:delay-250 h-full max-w-sm flex-row rounded-xl
                           shadow bg-[#FFD121]">
                            <a href="./usuario">
                                <img className="rounded-t-lg w-full h-[200px]" src="./src/assets/cardUsrComum.jpg" alt="" />
                            </a>
                            <div className="flex flex-col justify-center items-center h-12 p-2 rounded-b-lg bg-[#FFD121]">
                                <a href="./usuario">
                                    <h5 className="justify-center items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900">
                                        Usuários Comuns
                                    </h5>
                                </a>
                            </div>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );

}