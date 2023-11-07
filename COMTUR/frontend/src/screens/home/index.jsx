import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import { Card } from 'reactstrap';


const Home = () => {
  return (
    <div className="home">
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-2 container-fluid">
          <Navbar />

          <div className="cont-home" style={{ paddingLeft: 50 }}>
            <h1 className="text-2xl pb-10 font-semibold">Bem Vindo, Rodrigo Faro!</h1>
            <Card></Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
