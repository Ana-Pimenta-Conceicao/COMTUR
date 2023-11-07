import React from "react";
import { Link } from 'react-router-dom';

export default function Inicio(){
    return(
        <div className="Inicio" style={{justifyContent:"center", alignItems:"center", display:'flex'}}>
            <Link to={`/home`} style={{ textDecoration: 'none', color: 'inherit'}}>
                <button>HOME</button></Link>

        </div>
    )
}