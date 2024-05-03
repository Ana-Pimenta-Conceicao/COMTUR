
import React from 'react'
import logoComturSF from "../assets/logoSF.svg";

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-black'>

        <img className="w-[200px] animate-spin-slow" src={logoComturSF}/>
        <h1 className='pt-3 font-bold text-[#FFFFF1]'>Ops... Essa página não pode ser acessada!</h1>
    </div>
  )
}

export default NotFound;
