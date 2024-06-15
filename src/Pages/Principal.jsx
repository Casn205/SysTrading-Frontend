import Banner from './Banner';
import '../Style/Principal.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import NavBar from "../Components/NavBar";

function App() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/Products/Obtener");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const images = products.map(product => product.image);

  return (
    <>
    <NavBar />
    <div className="App">
      <Banner images={images} />
      <div className="content">
        <h2>Sobre Systrading</h2>
        <p>Es un sistema de gestión de inventario que ofrece la ventaja de mantener organizado e 
          identificado cada producto de venta, lo que puede ser traducido en ahorrar tiempo y recursos
          útiles para mejorar la calidad de la organización y que apoya a la prevención de inconvenientes en 
          la gestión de inventario.</p>
      </div>
    </div>
    </>
  );
}

export default App;
