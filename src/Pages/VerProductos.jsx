import React, { useState, useEffect } from 'react';
import NavBar from "../Components/NavBar";
import axios from "axios";
import Swal from 'sweetalert2'; // Importa Swal para mostrar mensajes de confirmación
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import '../Style/VerProductos.css'; // Importa la hoja de estilos CSS

const VerProductos = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleUpdateClick = (idproduct) => {
    navigate("/ActualizarProducto/" + idproduct);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/Products/Obtener");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProducto = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/Products/eliminar/${id}`);
          getProducts();
          Swal.fire({
            icon: "success",
            title: "Producto eliminado",
            text: "El producto ha sido eliminado correctamente.",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al eliminar el producto. Por favor, intenta de nuevo."
          });
        }
      }
    });
  };

  return (
    <>
      <NavBar />
      <div className="container-md">
        <h1>Productos</h1>
        <div className="row">
          {products.map((product) => (
            <div key={product.idproducto} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="card-img-top" src={product.image} alt={product.name} />
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <h5>${Number(product.unit_price).toLocaleString()}</h5>
                  <p className="card-text">Cantidad: {product.cantidad}</p>
                  <button className="btn btn-danger btn-bordered" onClick={() => deleteProducto(product.idproduct)}>Eliminar</button>
                  <button className="btn btn-warning btn-bordered" onClick={() => handleUpdateClick(product.idproduct)}>
                    Modificar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VerProductos;
