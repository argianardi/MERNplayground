import { NavLink } from 'react-router-dom';

const links = ['about', 'products', 'orders'];

const NavList = () => {
  return (
    <>
      {links.map((link, index) => (
        <li key={index}>
          <NavLink to={link} className="capitalize">
            {link}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default NavList;
