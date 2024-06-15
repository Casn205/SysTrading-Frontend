import { useParams } from "react-router-dom";
import DataEquipos from "../Data/DataEquipos";
import { Link } from "react-router-dom";
import "../Style/Detalles.css"

const EquipoDetalles = () => {
  const {EquipoId} = useParams();
  

  const obtenerEquipo = ()=>{

    for(let x=0;x<DataEquipos.length;x++){
        if(DataEquipos[x].id===EquipoId){
           return DataEquipos[x];
        }
    }
  }
  let encontrado = obtenerEquipo();
  if(encontrado!==undefined){
    return (
        <div className="Targeta">
            <div>
                <h1>{encontrado.Nombre}</h1>
            </div>
            <div className="Imagen">
                <img src={encontrado.imagen} alt={encontrado.Nombre+"-img"} />
            </div>
            <div className="Datos">
                <p>Ligas Locales Ganadas: {encontrado.LigasLocalesGanadas}</p><br />
                <p>Champions Ganadas: {encontrado.ChampionsGanadas}</p><br />
                <p>Europa Leagues Ganadas: {encontrado.EuropaLeaguesGanadas}</p><br />
                <p>Copas Locales Ganadas: {encontrado.CopasLocalesGanadas}</p>      
            </div>
            <Link to="/Equipos" className="Btn">Volver</Link>

        </div>
  );
  }else{
    return <h1>No se han encontrado los datos</h1>
  }
  
};

export default EquipoDetalles;




