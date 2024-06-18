import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CgMenuRight as Hamburger } from 'react-icons/cg';
import logoSvg from '../../assets/NBCropped.png';
import './navbar.css';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src={logoSvg} alt="Logo" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="" activeclassname="active">News</NavLink>
            </li>
            <li>
              <NavLink to="/feedback" activeclassname="active">Feedback</NavLink>
            </li>
            <li>
              <NavLink to="/about" activeclassname="active">About</NavLink>
            </li>
            <li>
              <NavLink to="/donate" activeclassname="active">Donate</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
