import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/avatar1.jpg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="logo"  />
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/profile/asdadsad">Ernest Achiver</Link>
          </li>
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="authors">Authors</Link>
          </li>
          <li>
            <Link to="logout">Logout</Link>
          </li>
        </ul>
        <button className="nav_toogle-btn">
            <AiOutlineClose/>
        </button>
      </div>
    </nav>
  );
};

export default Header;
