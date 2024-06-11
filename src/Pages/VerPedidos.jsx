import NavBar from "../Components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VerPedido = () => {
    const [pedidos, setPedido] = useState([]);
  
    useEffect(() => {
      getPedido();
    }, []);
  
    const getPedido = async () => {
      try {
        const res = await axios.get("http://localhost:8080/pedido/Obtener");
        setPedido(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <NavBar />
        <div className="container-md">
          <h1>Pedido</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">FECHA DE CREACION</th>
                <th scope="col">ESTADO</th>
                <th scope="col">FECHA DE ENTREGA</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.idPedido}>
                  <th scope="row">{pedido.idPedido}</th>
                  <td>{pedido.fecha_de_creacion}</td>
                  <td>{pedido.estado}</td>
                  <td>{pedido.fecha_de_entrega}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default VerPedido;