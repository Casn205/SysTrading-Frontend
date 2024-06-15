import NavBar from "../Components/NavBar";
import axios from "axios";
import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const VerEgreso = () => {
    const [egresos, setEgreso] = useState([]);
  
    useEffect(() => {
      getEgreso();
    }, []);
  
    const getEgreso = async () => {
      try {
        const res = await axios.get("http://localhost:8080/egreso/obtener");
        setEgreso(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <NavBar />
        <div className="container-md">
          <h1>Egreso</h1>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">ID PRODUCTO</th>
                <th scope="col">CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              {egresos.map((egreso) => (
                <tr key={egreso.idEgreso}>
                  <th scope="row">{egreso.idEgreso}</th>
                  <td>{egreso.idProducto}</td>
                  <td>{egreso.Cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default VerEgreso;