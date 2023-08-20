import { useState } from 'react';
import { Link } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import logo from '../../assets/icons/Logo.svg';
import accountIcon from '../../assets/icons/account.svg';
import './Header.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { logoutCustomer } from '../../store/customer';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const customer = useAppSelector((state) => state.customer.customer);
  const dispatch = useAppDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      enableBodyScroll(document.body);
    } else {
      disableBodyScroll(document.body);
    }
  };
  const closeMenu = () => {
    setMenuOpen(false);
    enableBodyScroll(document.body);
  };

  const onLogoutClick = () => {
    dispatch(logoutCustomer());
  };

  return (
    <div className="header">
      <div className="header_logo">
        <img src={logo} alt="Logo Organic" />
        <h3>Organic</h3>
      </div>
      <nav>
        <div className={`header_burger-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
        </div>
        <ul className={`menu ${menuOpen ? 'open' : ''}`}>
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMenu}>
              About Team
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={closeMenu}>
              Shop
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          {!customer ? (
            <>
              <li>
                <Link to="/registration" onClick={closeMenu}>
                  <div className="header_sign">
                    <img src={accountIcon} alt="Account Icon" />
                    <p>Log In</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  <div className="header_sign">
                    <img src={accountIcon} alt="Account Icon" />
                    <p>Sign Up</p>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={onLogoutClick}>
                <div className="header_sign">
                  <img src={accountIcon} alt="Account Icon" />
                  <p>Log Out</p>
                </div>
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
export default Header;
