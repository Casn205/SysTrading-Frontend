import React, { useState } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/RegistroUsuarios.css";
import axios from "axios";
import verificarToken from '../Components/VerificarToken';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom";

const Validar = () => {
  if (verificarToken()) {
    return <ModificarUsuario />; 
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No estas autorizado para ingresar a este recurso"
    });
    return <NavBar />;
  }
};

const ModificarUsuario = () => {
  // Declarar los datos a utilizar
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Contraseña, setContraseña] = useState("");

  // Obtener el userId de los parámetros de la ruta
  const {UserId}  = useParams();

  // Cargar los datos del usuario al montar el componente

  // Ocasionar el evento para enviar los datos
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put("http://localhost:8080/usuario/actualizar/"+UserId, {
        Nombre:Nombre,
        Apellido:Apellido,
        Correo:Correo,
        Contraseña:Contraseña
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
  };

  // Mostrar los datos en pantalla
  return (
    <>
      <NavBar />
      <div className="registro-container d-flex justify-content-center align-items-center">
        <div className="registro-card shadow-lg rounded p-4">
          <h1 className="text-center mb-4">Modificar Usuario</h1>
          <form onSubmit={handleLogin}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Ingrese su nombre"
                    value={Nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="apellido">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    placeholder="Ingrese su apellido"
                    value={Apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="correo">Correo electrónico:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="correo"
                    placeholder="Ingrese su correo electrónico"
                    value={Correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="contrasena">Contraseña:</label>
                  <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    placeholder="Ingrese su contraseña"
                    value={Contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Validar;
