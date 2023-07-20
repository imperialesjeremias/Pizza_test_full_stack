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
    const isLoginPath = location.pathname === "/login";

    return (
      <nav className='bg-gray-100 px-10 py-5 flex justify-between'>
        <h1 className='text-lg'>Pizzas Stock</h1>
        <ul className='flex gap-x-4'>
        {isAuth === "true" && !isLoginPath && (
          <li>
            <Link className='bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded' to="/">Home</Link>
          </li>
        )}
        <li>
          {isAuth === "true" ? (
            <button className='bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded' onClick={handleLogout}>Logout</button>
          ) : (
            isLoginPath ? (
              <Link className='bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded' to="/register">Register</Link>
            ) : (
              <Link className='bg-indigo-700 text-white text-sm font-medium px-2 py-1 hover:bg-indigo-600 focus:outline-none rounded' to="/login">Login</Link>
            )
          )}
          </li>
        </ul>
      </nav>
    );
  }

export default Navbar;