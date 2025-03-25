import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import StorageService from "../../util/StorageService";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaTachometerAlt, 
  FaPlusCircle, 
  FaTools,
  FaHammer
} from "react-icons/fa";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [role,setRole] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
    localStorage.removeItem("role");
    StorageService.logout();
    naviagate
    logout();
  };
  

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.nav-links') && !event.target.closest('.mobile-menu-toggle')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  useEffect(()=>{
    const role = localStorage.getItem("role");
    if(role === null){
      setRole(null);
    }
    setRole(role);
    console.log(role);
  },[user])

  return (
    <nav className="navbar">
    <div className="logo">
        <FaHammer style={{ marginRight: '8px' }} />
        Maker's Hub
      </div>
      
      <div className="mobile-menu-toggle" onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
      
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>

        {role ? (
          <>
            {role === "CLIENT" ? (
              <>
                <li className={isActive('/all-posts')}>
                  <Link to="/all-posts">
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Link>
                </li>
                <li className={isActive('/create-post')}>
                  <Link to="/create-post">
                    <FaPlusCircle className="nav-icon" />
                    Create Post
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={isActive('/crafter-all-posts')}>
                  <Link to="/crafter-all-posts">
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Link>
                </li>
                <li className={isActive('/crafter-work')}>
                  <Link to="/crafter-work">
                    <FaTools className="nav-icon" />
                    Work
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/" onClick={handleLogout}>
                <FaSignOutAlt className="nav-icon" />
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
          <li className={isActive('/')}>
            <Link to="/">
              <FaHome className="nav-icon" />
              Home
            </Link>
          </li>
          <li className={isActive('/login')}>
            <Link to="/login">
              <FaUserCircle className="nav-icon" />
              Login
            </Link>
          </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
