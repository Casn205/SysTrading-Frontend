import NavBar from "../Components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VerUsuarios = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/usuario/Obtener");
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container-md">
        <h1>Usuarios</h1>
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
            {users.map((user) => (
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

export default VerUsuarios;
