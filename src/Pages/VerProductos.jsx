import NavBar from "../Components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VerProductos = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <>
      <NavBar />
      <div className="container-md">
        <h1>Productos</h1>
        <div className="row">
          {products.map((product) => (
            <div key={product.idProducto} className="col-lg-4 col-md-6 mb-4">
              <div className="card h-100">
                <img className="card-img-top" src={product.image} alt={product.name} />
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <h5>${product.unit_price}</h5>
                  <p className="card-text">Cantidad: {product.cantidad}</p>
                  <button className="btn btn-primary">Agregar al Carrito</button>
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
