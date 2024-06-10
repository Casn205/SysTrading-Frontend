import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const VerProveedor = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    try {
      const res = await axios.get("http://localhost:8080/Proveedor/Obtener");
      setProveedores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-md">
        <h1>Proveedores</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">TELÉFONO</th>
              <th scope="col">CORREO</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.idProveedor}>
                <th scope="row">{proveedor.idProveedor}</th>
                <td>{proveedor.Nombre}</td>
                <td>{proveedor.Telefono}</td>
                <td>{proveedor.Correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default VerProveedor;
