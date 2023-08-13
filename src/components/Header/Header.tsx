import { Link } from 'react-router-dom';
import logo from '../../assets/icons/Logo.svg';
import accountIcon from '../../assets/icons/account.svg';
import './Header.scss';

function Header() {
  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="Logo Organic" />
        <h3>Organic</h3>
      </div>
      <nav>
        <ul className="menu">
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
            <Link to="/news">News</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/account">
              <img src={accountIcon} alt="Account Icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
