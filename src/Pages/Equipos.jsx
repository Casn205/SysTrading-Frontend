import NavBar from "../Components/NavBar"
import {Link} from "react-router-dom"
import DataEquipos from "../Data/DataEquipos";
import "../Style/Equipos.css"

const Equipos = () => {
  
  return (
    <>
      <NavBar />
      <div className="Pagina">

        <h1 id="Titulo">Equipos</h1>

          <div className="Contenedor">

            {DataEquipos.map((equipo) => (

              <div key={equipo.id} className="elements-Equipo">
                
                <div className="Logo-equipo">
                <img src={equipo.imagen} alt={equipo.Nombre + "-img"} className="imagen-equipo" />
                </div>

                <div className="Nombre-equipo">
                <p>{equipo.Nombre}</p>
                </div>

                <Link to={'/EquipoDetalles/'+equipo.id} className="Btn-detalles">
                  Ver detalles
                </Link>

              </div>

            ))}

          </div>
      </div>
    </>);
};
  export default Equipos;
  