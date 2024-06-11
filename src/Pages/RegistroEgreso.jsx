// RegistroEgreso.js

import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/RegistroEgreso.css"; // Importa el archivo CSS creado
import axios from "axios";

const RegistroEgreso = () => {
  const [idProducto, setIdProducto] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos();
  }, []);

  const getProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products/Obtener");
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterDetail = async (event) => {
    event.preventDefault();
    const validProducto = productos.some(producto => producto.idproduct === parseInt(idProducto));
    const productoSeleccionado = productos.find(producto => producto.idproduct === parseInt(idProducto));
    if (!validProducto) {
      alert("ID de producto no válido.");
      return;
    }
    
    if (parseInt(Cantidad) > productoSeleccionado.cantidad) {
      alert("Escasez de productos. La cantidad solicitada es mayor que la disponible en el inventario");
      return;
    }
    if(parseInt(Cantidad)<1){
        alert("Cantidad debe ser mayor que 0");
        return;
    }

    

    try {
      const response = await axios.post("http://localhost:8080/egreso/registrar", {
        idProducto,
        Cantidad,
      });

      setIdProducto("");
      setCantidad("");

      if (response.status === 200) {
        alert("Egreso registrado correctamente");
      } else {
        alert("El registro del egreso no es válido");
      }
    } catch (error) {
      console.error("Error during detail registration:", error);
      alert("An error occurred during detail registration.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="registro-egreso-container d-flex justify-content-center align-items-center">
        <div className="registro-egreso-card shadow-lg rounded p-4">
          <h2 className="text-center mb-4">Registro de Egreso</h2>
          <form onSubmit={handleRegisterDetail}>
            <div className="form-group mb-3">
              <label htmlFor="idProducto">ID del Producto:</label>
              <input
                type="number"
                className="form-control"
                id="idProducto"
                placeholder="Ingrese el id del producto"
                value={idProducto}
                onChange={(e) => setIdProducto(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                placeholder="Ingrese la cantidad de productos vendidos"
                value={Cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Registrar Egreso
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegistroEgreso;
