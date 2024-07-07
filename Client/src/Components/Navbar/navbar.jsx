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
    event.stopPropagation(); // Prevent document click event from closing navbar
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
              <NavLink exact to="/" activeClassName="active">
                News
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback" activeClassName="active">
                Feedback
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" activeClassName="active">
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
