import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Principal from "./Pages/Principal";
import RegistroUsuario from "./Pages/RegistroUsuario";
import RegistroProveedor from "./Pages/RegistroProveedor";
import RegistroProductos from "./Pages/RegistroProductos";
import VerUsuarios from "./Pages/VerUsuarios";
import VerProveedor from "./Pages/VerProveedor";
import VerProductos from "./Pages/VerProductos";
import EquipoDetalles from "./Pages/EquipoDetalles"
import Pedido from "./Pages/Pedido"
import Egreso from "./Pages/Egreso"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Principal" element={<Principal />} />
        <Route path="/RegistroUsuario" element={<RegistroUsuario />} />
        <Route path="/RegistroProveedor" element={<RegistroProveedor />} />
        <Route path="/RegistroProducto" element={<RegistroProductos />} />
        <Route path="/Pedido" element={<Pedido/>} />
        <Route path="/Egreso" element={<Egreso/>} />
        <Route path="/VerUsuarios" element={<VerUsuarios/>} />
        <Route path="/VerProductos" element={<VerProductos/>} />
        <Route path="/VerProveedor" element={<VerProveedor/>} />  
        <Route path="/EquipoDetalles/:EquipoId" element={<EquipoDetalles />} />
        <Route path="*" element={<noEncontrado/>}/>
      </Routes>
  );
}
export default App;