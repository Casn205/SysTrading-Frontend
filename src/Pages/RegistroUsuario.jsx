import React from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/RegistroUsuarios.css";
import axios from "axios";
import { useState, useEffect } from "react";
import verificarToken from '../Components/VerificarToken';
import Swal from 'sweetalert2';

const Validar = () => {

  if (verificarToken()) {
    return <RegistroUsuario/>; 
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No estas autorizado para ingresar a este recurso"
    });
    return <NavBar />;
  }
};

const RegistroUsuario = () => {
  //Declarar los datos a utilizar
  const [Nombre, setNombre] = useState("");
  const [Apellido, setApellido] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Cedula, setCedula] = useState("");
  const [FechaNac, setFechaNac] = useState("");
  const [Contraseña, setContraseña] = useState("");
  const [Rol, setRol] = useState([]);
  const [rolSeleccion, setSeleccion] = useState("");
  const [User, setUser] = useState([]);
  const URL = "http://localhost:8080/usuario";

  //Obtengo la lista del desplegable
  useEffect(() => {
    getRol();
  }, []);

  const getRol = async () => {
    try {
      const res = await axios.get("http://localhost:8080/Rol/Obtener");
      setRol(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los roles."
      });
    }
  };

  //Obtener datos para la tabla
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const res = await axios.get(URL + "/Obtener");
      setUser(res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al obtener los usuarios."
      });
    }
  };

  //Ocasionar el evento para enviar los datos
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/usuario/registrar/" + rolSeleccion,
        {
          Nombre: Nombre,
          Apellido: Apellido,
          Cedula: Cedula,
          Correo: Correo,
          FechaNac: FechaNac,
          Contraseña: Contraseña,
        }
      );
      setNombre("");
      setApellido("");
      setCorreo("");
      setCedula("");
      setFechaNac("");
      setContraseña("");

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          text: "El usuario ha sido creado correctamente.",
          showConfirmButton: false,
          timer: 1500
        });
        getUser(); // Actualiza la lista de usuarios
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El usuario ingresado no es válido."
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el usuario. Por favor, intenta de nuevo."
      });
    }
  };

  //Mostrar los datos en pantalla
  return (
    <>
      <NavBar />
      <div className="registro-container d-flex justify-content-center align-items-center">
        <div className="registro-card shadow-lg rounded p-4">
          <h1 className="text-center mb-4">Registro de Usuario</h1>
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
                  <label htmlFor="cedula">Cédula:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="cedula"
                    placeholder="Ingrese su número de cédula"
                    value={Cedula}
                    onChange={(e) => setCedula(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                  <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaNacimiento"
                    value={FechaNac}
                    onChange={(e) => setFechaNac(e.target.value)}
                    required
                  />
                </div>
              </div>
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
                <div className="form-group">
                  <label htmlFor="rol">Rol:</label>
                  <select
                    className="form-control"
                    id="rol"
                    value={rolSeleccion}
                    onChange={(e) => setSeleccion(e.target.value)}
                    required>
                    <option>Seleccione un rol</option>
                    {Rol.map((rol) => (
                      <option key={rol.idRol} value={rol.idRol}>
                        {rol.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
            >
              Registrar
            </button>
          </form>
        </div>
      </div>

      {/*******************TABLA***********************/}

      <div className="container-md mt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">NOMBRE</th>
              <th scope="col">CORREO</th>
              <th scope="col">CEDULA</th>
            </tr>
          </thead>
          <tbody>
            {User.map((user) => (
              <tr key={user.idUsuario}>
                <th scope="row">{user.idUsuario}</th>
                <td>{user.Nombre}</td>
                <td>{user.Correo}</td>
                <td>{user.Cedula}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Validar;

