import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/avatar1.jpg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const Header = () => {
  const [isNavShowing,setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const closeNavHandler = ()=>{
    if(window.innerWidth < 800){
      setIsNavShowing(true)
    }else{
      setIsNavShowing(false)
    }
  }
  return (
    <nav>
      <div className="container nav-container">
        <Link to="/" className="nav-logo" onClick={closeNavHandler}>
          <img src={logo} alt="logo"  />
        </Link>
        {isNavShowing && <ul className="nav-menu">
          <li>
            <Link to="/profile/asdadsad" onClick={closeNavHandler}>Ernest Achiver</Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>Create Post</Link>
          </li>
          <li>
            <Link to="authors" onClick={closeNavHandler}>Authors</Link>
          </li>
          <li>
            <Link to="logout" onClick={closeNavHandler}>Logout</Link>
          </li>
        </ul> }
        <button className="nav_toogle-btn" onClick={()=>setIsNavShowing(!isNavShowing)}>
            {isNavShowing ? <AiOutlineClose/> : <FaBars/>}
        </button>
      </div>
    </nav>
  );
};

export default Header;
