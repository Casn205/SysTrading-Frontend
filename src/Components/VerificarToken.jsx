import {jwtDecode} from "jwt-decode";

const isAdmin = () => {
  const token = localStorage.getItem("token");

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.Rol === "Admin"; // Ajusta según la estructura del token
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};

export default isAdmin;

