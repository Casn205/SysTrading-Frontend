import NavBar from "../Components/NavBar"
import "../Style/Eventos.css"
import DataEventos from "../Data/DataEventos"
const About = () => {

  return (
    <>
      <NavBar />
      <div className="Pagina">
        <h1>Proximos eventos</h1>
        <div>

          <div className="Bloque">

            {DataEventos.map((ev) => (

              <div className="elments-evento">

                <div className="Horario">
                  {ev.Hora + ev.Fecha}
                </div>

                <div className="local">
                  <img src={ev.Local.imagen} alt={ev.Local} className="imagen-equipo" />
                  <p>{ev.Local.Nombre}</p>
                </div>
                <div className="vs">
                  <p>VS</p>

                </div>

                <div className="visitante">
                  <img src={ev.Visitante.imagen} alt={ev.Visitante} className="imagen-equipo" />
                  <p>{ev.Visitante.Nombre}</p>
                </div>
                
              </div>

            ))}

          </div>

        </div>
      </div>

    </>);
};
  export default About;
  