import { Link } from 'react-router-dom';
import logo from '../../assets/icons/Logo.svg';
import accountIcon from '../../assets/icons/account.svg';
import './Header.scss';
import { useState } from 'react';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="Logo Organic" />
        <h3>Organic</h3>
      </div>
      <nav>
        <div className="header_burger-btn" onClick={toggleMenu}>
          <span></span>
        </div>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Team</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/registration">
              <div className="header_sign">
                <img src={accountIcon} alt="Account Icon" />
                <p>Log In</p>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/authorization">
              <div className="header_sign">
                <img src={accountIcon} alt="Account Icon" />
                <p>Sign Up</p>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
