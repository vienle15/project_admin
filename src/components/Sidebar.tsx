import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import { useLocation } from "react-router-dom";
import { FaCubes, FaHome, FaListAlt, FaPray, FaReceipt } from "react-icons/fa";
import { logout, AuthState } from "../redux/Slice/AuthSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <div className="side-bar">
      <h3>Admin's Pages</h3>
      <ul>
        <li>
          <FaHome />
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>

        <li>
          <FaPray />
          <Link
            to="/user-management"
            className={location.pathname === "/user-management" ? "active" : ""}
          >
            User Management
          </Link>
        </li>
        <li>
          <FaCubes />

          <Link
            to="/product-management"
            className={
              location.pathname === "/product-management" ? "active" : ""
            }
          >
            Product Management
          </Link>
        </li>
        <li>
          <FaReceipt />
          <Link
            to="/order-management"
            className={
              location.pathname === "/order-management" ? "active" : ""
            }
          >
            Order Management
          </Link>
        </li>
        <li>
          <FaListAlt />
          <Link
            to="/category"
            className={location.pathname === "/category" ? "active" : ""}
          >
            Category
          </Link>
        </li>
      </ul>
      <button className="pri" onClick={handleLogout}>
        Log Out, see you soon ^^ !!!
      </button>
      <section className="Admin-login"></section>
    </div>
  );
};

export default Sidebar;
