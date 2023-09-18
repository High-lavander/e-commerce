import { useState } from 'react';
import { Link } from 'react-router-dom';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import logo from '../../assets/icons/Logo.svg';
import accountIcon from '../../assets/icons/account.svg';
import './Header.scss';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import { setCustomer } from '../../store/customer';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const loggedIn = useAppSelector((state) => Boolean(state.customer.customer));
  const { customer } = useAppSelector((state) => state.customer);
  const { basket } = useAppSelector((state) => state.basket);
  const dispatch = useDispatch();

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
    localStorage.removeItem('customer');
    dispatch(setCustomer(null));
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header_logo">
          <img src={logo} alt="Logo Organic" />
          <h3>Organic</h3>
        </div>
      </Link>
      <nav>
        <div data-testid="burger_btn" className={`header_burger-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span></span>
        </div>
        <ul data-testid="menu" className={`menu ${menuOpen ? 'open' : ''}`}>
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

          {!loggedIn ? (
            <>
              <li>
                <Link to="/login" onClick={closeMenu}>
                  <div className="header_sign">
                    <div className="header_sign_circle">
                      <img src={accountIcon} alt="Account Icon" />
                    </div>
                    <p>Log In</p>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/registration" onClick={closeMenu}>
                  <div className="header_sign">
                    <div className="header_sign_circle">
                      <img src={accountIcon} alt="Account Icon" />
                    </div>
                    <p>Sign Up</p>
                  </div>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/user-profile/${customer?.id}`} onClick={closeMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <button className="header_logout-btn header_sign" onClick={onLogoutClick}>
                  <p>Log Out</p>
                </button>
              </li>
            </>
          )}
          <li>
            <Link to={`/basket/${customer?.id}`} onClick={closeMenu}>
              <div className="header_shopping-basket">
                <span className="header_basket-icon"></span>
                <span className="header_basket-counter">{basket?.totalLineItemQuantity || 0}</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
