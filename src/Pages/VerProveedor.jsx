import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const VerProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const navigate = useNavigate();
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

  const handleUpdateClick = (id) => {
    navigate("/EditarProveedor/"+id);
 };      
            
       

 const deleteProveedor = async (id) => {
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
       try {
         axios.delete("http://localhost:8080/proveedor/eliminar/"+id);
      } catch (error) {
        console.log(error);
      }
     }
   });
   
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
                <td>{proveedor.correo}</td>
                <td>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => handleUpdateClick(proveedor.idproveedor)}
                  >
                    Modificar
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => deleteProveedor(proveedor.idproveedor)}
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

export default VerProveedor;
