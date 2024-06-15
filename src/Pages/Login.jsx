import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContraseña] = useState("");


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/usuario/Login", {
        "Correo": correo,
        "Contraseña": contrasena,
      });

      const { token, mensaje } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        navigate("/Principal");
      } else {
        alert(mensaje);
      }

    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center h-100 w-100 bg-gradient-to-r from-indigo-500 to-blue-400">
      <h1 className="text-center text-white mb-4">Inicio de sesión</h1>
      <form onSubmit={handleLogin} className="shadow-md rounded p-4 bg-white login-form">
        <div className="form-group mb-3">
          <label htmlFor="correo" className="form-label text-gray-700 font-medium">
            Correo electrónico:
          </label>
          <input
            type="email"
            className="form-control"
            id="correo"
            placeholder="Ingrese su correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="contrasena" className="form-label text-gray-700 font-medium">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="contrasena"
            placeholder="Ingrese su contraseña"
            value={contrasena}
            onChange={(e) => setContraseña(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-3">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;




