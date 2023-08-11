import { NavLink } from 'react-router-dom';
import './header.scss';
const navigationLinks = [
  {
    to: '/registration',
    name: 'Registration',
  },
];
const Header = () => {
  const activeClassName = 'navigation__item_active';
  return (
    <header>
      <div>
        <NavLink to="/">Header</NavLink>
        <nav className="navigation">
          <ul className="navigation__list">
            {navigationLinks.map((link) => (
              <li key={link.to} className="navigation__item">
                <NavLink to={link.to} className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
