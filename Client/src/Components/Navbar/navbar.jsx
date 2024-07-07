import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CgMenuRight as Hamburger } from 'react-icons/cg';
import logoSvg from '../../assets/NBCropped.png';
import './navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const navbarRef = useRef(null);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleCloseNavbar = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowNavbar(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    handleShowNavbar();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoSvg} alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleMenuClick}>
          <Hamburger />
        </div>
        <div ref={navbarRef} className={`nav-elements ${showNavbar ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink exact to="/" activeClassName="active" onClick={handleCloseNavbar}>
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback" activeClassName="active" onClick={handleCloseNavbar}>
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active" onClick={handleCloseNavbar}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" activeClassName="active" onClick={handleCloseNavbar}>
                Donate
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="separator-line"></div>
    </nav>
  );
};

export default Navbar;
