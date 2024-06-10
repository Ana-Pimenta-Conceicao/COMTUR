import React from "react";
import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import SidebarAdm from "../../components/admin/sidebarAdm.jsx";
import NavBarAdm from "../../components/admin/navbarAdm.jsx";
import CardTipoUsuario from "../../components/cards/cardTipoUsuario.jsx";

export default function TipoUsuario() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    return (
        <div className="home">
            <div className="h-screen flex fixed">
                <SidebarAdm setOpen={setSidebarOpen} open={sidebarOpen} />
            </div>
            <div className={`flex-1 container-fluid pl-[200px] ${!sidebarOpen && "pl-[100px]"}`}>
                <NavBarAdm />
                <div className="pl-8 pr-8 pt-[20px]">
                    <h1 className="text-3xl font-semibold pb-2">Usuários</h1>
                    <hr className="pb-4 border-[2.5px] border-[#DBDBDB]" />
                    <CardTipoUsuario />
                </div>
            </div>
        </div>
    );
}