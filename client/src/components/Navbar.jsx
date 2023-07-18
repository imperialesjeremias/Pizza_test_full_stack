import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("basicToken");
        localStorage.setItem("isAuth", false)
        navigate("/login");
    }
    const token = localStorage.getItem("token");
    const basicToken = localStorage.getItem("basicToken");
    const isAuth = localStorage.getItem("isAuth");
  
    return (
      <nav>
        <h1>Pizzas Shop</h1>
  
        <ul>
          {isAuth === "true" ? (<li>
            <Link to="/">Home</Link>
          </li>) : (<></>)}
          <li>
            {isAuth === "true" ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to="/register">Registrar</Link>
            )}
          </li>
          {!isAuth && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }

export default Navbar;