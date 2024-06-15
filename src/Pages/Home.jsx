import NavBar from "../Components/NavBar"
import "../Style/Home.css"
const Home = () => {
  return (
    <>
      <NavBar />
      <div className="Inicio-home">
        <div className="Info-home">
          <h1>Bienvenido a SPORT-APP</h1>
          <h3>Aquí podrás ver datos importantes sobre tus equipos favoritos y los próximos eventos</h3>
        </div>
      </div>
    </>

  );
};
  export default Home;