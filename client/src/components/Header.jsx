import React, { useState,useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../images/avatar1.jpg";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { UserContext } from "../context/UserContext";
const Header = () => {
  const [isNavShowing,setIsNavShowing] = useState(window.innerWidth > 800 ? true : false)
  const {currentUser} = useContext(UserContext)
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
        {currentUser?.id && isNavShowing && <ul className="nav-menu">
          <li>
            <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>{currentUser.name}</Link>
          </li>
          <li>
            <Link to="/create" onClick={closeNavHandler}>Create Post</Link>
          </li>
          <li>
            <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
          </li>
        </ul> }
        {!currentUser?.id && isNavShowing && <ul className="nav-menu">
          <li>
            <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
          </li>
          <li>
            <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
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
