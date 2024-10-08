import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ cart }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("thorn_user")); // Get the current user

  const totalItems = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0
  );

  return (
    <ul className="navbar">
      <div className="navbar-item-group">
        <li className="navbar-item">
          <Link className="navbar-link" to="/nurseries">
            Nurseries
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/distributors">
            Distributors
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/retailers">
            Retailers
          </Link>
        </li>
        {currentUser ? (
          <li className="navbar-item">
            <Link className="navbar-link" to="/mycart">
              My Cart ({totalItems})
            </Link>
          </li>
        ) : null}
      </div>
      {currentUser ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("thorn_user");
              navigate("/login", { replace: true }); // Navigate immediately
            }}
          >
            Logout
          </Link>
        </li>
      ) : null}
    </ul>
  );
};
