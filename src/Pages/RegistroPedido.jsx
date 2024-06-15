import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Style/RegistroPedido.css";
import axios from "axios";

const DetallePedido = () => {
  const [idProducto, setIdProducto] = useState("");
  const [idPedido, setIdPedido] = useState("");
  const [Cantidad, setCantidad] = useState("");
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getProductos();
    getPedidos();
  }, []);

  const getProductos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/products/Obtener");
      setProductos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPedidos = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pedido/Obtener");
      setPedidos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegisterDetail = async (event) => {
    event.preventDefault();
    const validProducto = productos.some(producto => producto.idproduct === parseInt(idProducto));
    const validPedido = pedidos.some(pedido => pedido.idPedido === parseInt(idPedido));

    if (!validProducto) {
      alert("ID de producto no válido.");
      return;
    }

    if (!validPedido) {
      alert("ID de pedido no válido.");
      return;
    }

    if(parseInt(Cantidad)<1){
        alert("Cantidad debe ser mayor que 0");
        return;
    }

    try {
      const response = await axios.post("http://localhost:8080/Detalle/registrar", {
        idProducto,
        idPedido,
        Cantidad,
      });

      setIdProducto("");
      setIdPedido("");
      setCantidad("");

      if (response.status === 200) {
        alert("Detalle del pedido registrado correctamente");
      } else {
        alert("El registro del detalle del pedido no es válido");
      }
    } catch (error) {
      console.error("Error during detail registration:", error);
      alert("An error occurred during detail registration.");
    }
  };

  return (
    <div className="detalle-pedido shadow-lg rounded p-4">
      <h2 className="text-center mb-4">Registro de Detalles del Pedido</h2>
      <form onSubmit={handleRegisterDetail}>
        <div className="form-group mb-3">
          <label htmlFor="idProducto">ID del Producto:</label>
          <input
            type="number"
            className="form-control"
            id="idProducto"
            placeholder="Ingrese el id del producto"
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="idPedido">ID del Pedido:</label>
          <input
            type="number"
            className="form-control"
            id="idPedido"
            placeholder="Ingrese el id del pedido"
            value={idPedido}
            onChange={(e) => setIdPedido(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            placeholder="Ingrese la cantidad de productos comprados"
            value={Cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Registrar Detalle
        </button>
      </form>
    </div>
  );
};

const RegistroPedido = () => {
  const [FechaC, setFechaC] = useState("");
  const [Estado, setEstado] = useState("");
  const [FechaE, setFechaE] = useState("");

  const handleRegisterPedido = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/pedido/registrar", {
        fecha_de_creacion: FechaC,
        estado: Estado,
        fecha_de_entrega: FechaE,
      });

      setFechaC("");
      setEstado("");
      setFechaE("");

      if (response.status === 200) {
        alert("Pedido creado correctamente");
      } else {
        alert("El pedido creado no es válido");
      }
    } catch (error) {
      console.error("Error during pedido registration:", error);
      alert("An error occurred during pedido registration.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="registro-pedido-container d-flex justify-content-center align-items-center">
        <div className="row w-100">
          <div className="col-md-6">
            <div className="registro-pedido-card shadow-lg rounded p-4">
              <h1 className="text-center mb-4">Registro de Pedido</h1>
              <form onSubmit={handleRegisterPedido}>
                <div className="form-group mb-3">
                  <label htmlFor="fechaCreacion">Fecha de Creacion:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaCreacion"
                    value={FechaC}
                    onChange={(e) => setFechaC(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="estado">Estado:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="estado"
                    placeholder="Ingrese el estado del pedido"
                    value={Estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="fechaEntrega">Fecha de entrega:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="fechaEntrega"
                    value={FechaE}
                    onChange={(e) => setFechaE(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Registrar Pedido
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <DetallePedido />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistroPedido;

