import React, { useState } from 'react';
import NavBar from "../Components/NavBar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

const VerProductos = () => {
    const {Idproduct}  = useParams();
    const [name, setname] = useState("");
    const [unit_price, setunit_price] = useState("");
    const [cantidad, setcantidad] = useState("");
    const [image, setimage] = useState("");

    const handleLogin = async (event) => {
      event.preventDefault();
      try {
        const response = await axios.put("http://localhost:8080/Products/actualizar/"+Idproduct, {
          name:name,
          unit_price:unit_price,
          cantidad:cantidad,
          image:image,
        })
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: "El usuario ha sido actualizado correctamente.",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "El usuario ingresado no es válido."
          });
        }
      } catch (error) {
        console.error("Error durante la actualización:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al actualizar el usuario. Por favor, intenta de nuevo."
        });
      }
    }

  return (
    <>
      <NavBar />
      <div className="registro-producto-container d-flex justify-content-center align-items-center">
        <div className="registro-producto-card shadow-lg rounded p-4">
          <h1 className="text-center mb-4">Registro de Producto</h1>
          <form  onSubmit={handleLogin }>
            <div className="form-group mb-3">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Ingrese el nombre del producto"
                value={name}
                onChange={(e) => setname(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="unit_price">Precio</label>
              <input
                type="number"
                className="form-control"
                id="precio"
                min="0"
                placeholder="Ingrese el precio del producto"
                value={unit_price}
                onChange={(e) => setunit_price(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                className="form-control"
                id="cantidad"
                placeholder="Ingrese la cantidad que desea registrar"
                value={cantidad}
                onChange={(e) => setcantidad(e.target.value)}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="image">Imagen:</label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                placeholder ="Ingrse la url" 
                value={image}
                onChange={(e) => setimage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              actualizar Producto
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerProductos;
