import { Link } from 'react-router-dom';
import logo from '../../assets/icons/Logo.svg';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_contact">
        <h4>Contact Us</h4>
        <ul>
          <li>
            <p>Anvar Abduragimov</p>
            <a href="https://github.com/crecker05ru">crecker05ru</a>
          </li>
          <li>
            <p>Tatsiana Kulinkovich</p>
            <a href="https://github.com/bogdanovich231">bogdanovich231</a>
          </li>
          <li>
            <p>Shakhzod Ikramov</p>
            <a href="https://github.com/shakhzod235">shakhzod235</a>
          </li>
        </ul>
      </div>
      <div className="footer_information">
        <div className="footer_information_logo">
          <img src={logo} alt="Logo Organic" />
          <h3>Organic</h3>
        </div>
        <div className="footer_information_description">
          <p>
            We offer only natural and environmentally clean products for your health and well-being. Choose quality and
            care for nature with our organic products.
          </p>
        </div>
      </div>
      <div className="footer_pages">
        <h4>Pages</h4>
        <ul>
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
            <Link to="/account">Account</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
