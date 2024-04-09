import React, { useEffect }  from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/AuthSlice";
function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    dispatch(logout());
    localStorage.removeItem("cartItems");
    localStorage.removeItem("users")
  };
  useEffect(() => {
    if (loginSuccess()) {
      navigate('/products');
    }
  }, []);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "gray" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/" style={{ color: "white" }}>
            E-Store
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/products"
                  style={{ color: "white" }}
                >
                  Products
                </Link>
              </li>
              <li className="nav-item">
                {loggedInUser && (
                  <Link
                    className="nav-link active"
                    to="/mycart"
                    style={{ color: "white" }}
                  >
                    Mycart
                  </Link>
                )}
              </li>
            </ul>
            {!loggedInUser && (
              <>
                {" "}
                <Link className="btn btn-dark mx-2" to="/" role="button">
                  Login
                </Link>
                <Link className="btn btn-dark mx-2" to="/signup" role="button">
                  Signup
                </Link>{" "}
              </>
            )}
            {loggedInUser && (
              <Link
                className="btn btn-danger mx-2"
                role="button"
                onClick={handleLogout}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
