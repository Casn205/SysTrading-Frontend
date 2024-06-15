import NavBar from "../Components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

const VerUsuarios = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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
  
  
  
  
  const handleUpdateClick = (id) => {
     navigate("/EditarUsuario/"+id);
  };      
             
        

  const deleteUser = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
    alert(id)
    try {
      await axios.delete("http://localhost:8080/usuario/eliminar/"+id);
      getUsers(); 
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
              <th scope="col">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.idUsuario}>
                <th scope="row">{user.idUsuario}</th>
                <td>{user.Nombre}</td>
                <td>{user.Correo}</td>
                <td>{user.Cedula}</td>
                <td>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => handleUpdateClick(user.idUsuario)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteUser(user.idUsuario)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};





export default VerUsuarios;

