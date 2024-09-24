import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

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
      </div>
      {localStorage.getItem("thorn_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("thorn_user");
              navigate("/login", { replace: true }); // Change to the correct login route
            }}
          >
            Logout
          </Link>
        </li>
      ) : null}
    </ul>
  );
};
