import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link className="navbar-link" to="/nurseries">
          Nurseries
        </Link>
      </li>
      <li>
        <Link className="navbar-link" to="/distributors">
          Distributors
        </Link>
      </li>
      <li className="navbar-item">
        <Link className="navbar-link" to="/retailers">
          Retailers
        </Link>
      </li>
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
