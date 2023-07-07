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
    return (
        <nav>
            <h1>Pizzas Shop</h1>

            <ul>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    {localStorage.getItem("token") || localStorage.getItem("basicToken") ? (
                        <button
                        onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link
                        to='/login'>
                        Login
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;