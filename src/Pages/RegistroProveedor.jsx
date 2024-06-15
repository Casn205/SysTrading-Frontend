import React from 'react';
import NavBar from '../Components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Style/RegistroProveedor.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import verificarToken from '../Components/VerificarToken';
import Swal from 'sweetalert2';


const Validar = () => {

  if (verificarToken()) {
    return <RegistroProveedor/>; 
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No estas autorizado para ingresar a este recurso"
    });
    return <NavBar />;
  }
};

const RegistroProveedor = () => {
  const [Nombre, setNombre] = useState("");
  const [Telefono, setTelefono] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Provedores, setProveedores] = useState([]);
  const URL = "http://localhost:8080/proveedor";

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    try {
      const res = await axios.get(URL + "/Obtener");
      setProveedores(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los proveedores."
      });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/proveedor/registrar", {
        "Nombre": Nombre,
        "Telefono": Telefono,
        "correo": Correo
      });
      setNombre("");
      setTelefono("");
      setCorreo("");

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Proveedor creado",
          text: "El proveedor ha sido creado correctamente.",
          showConfirmButton: false,
          timer: 1500
        });
        getProveedores(); // Actualiza la lista de proveedores
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El proveedor ingresado no es válido."
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el proveedor. Por favor, intenta de nuevo."
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="registro-proveedor-container d-flex justify-content-center align-items-center">
        <div className="registro-proveedor-card shadow-lg rounded p-4">
          <h1 className="text-center mb-4">Registro de Proveedor</h1>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="nombre"
                placeholder="Ingrese el nombre del proveedor"
                value={Nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                className="form-control"
                id="telefono"
                placeholder="Ingrese el teléfono del proveedor"
                value={Telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="correo">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Ingrese el correo electrónico del proveedor"
                value={Correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Registrar Proveedor
            </button>
          </form>
        </div>
      </div>

      <div className="container-md mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">Teléfono</th>
              <th scope="col">Correo</th>
            </tr>
          </thead>
          <tbody>
            {Provedores.map((Prov) => (
              <tr key={Prov.idProveedor}>
                <th scope="row">{Prov.idProveedor}</th>
                <td>{Prov.Nombre}</td>
                <td>{Prov.Telefono}</td>
                <td>{Prov.correo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Validar;
