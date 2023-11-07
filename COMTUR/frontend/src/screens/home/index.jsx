import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';


const Home = () => {
  return (
    <div className="home">
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-2 container-fluid">
          <Navbar />
          </div>

        {/* Conteúdo da página */}
      </div> </div>
  );
}

export default Home;
