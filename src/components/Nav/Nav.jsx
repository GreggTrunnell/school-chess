import { NavLink } from 'react-router-dom';
import "./Nav.css"; // add styles here

function Nav() {
  return (
    <nav className="Nav">
      <div className="nav-links">
        <NavLink className="btn btn-success" to="/">Home</NavLink>
        <NavLink className="btn btn-success" to="/tournaments">Tournaments</NavLink>
        <NavLink className="btn btn-success" to="/learningResources">Learning Resources</NavLink>
        <NavLink className="btn btn-success" to="/about">About</NavLink>
      </div>

     
    </nav>
  );
}

export default Nav;
