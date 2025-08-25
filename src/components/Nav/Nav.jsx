import { NavLink } from 'react-router-dom';

function Nav( ) {
  
  return (
    <nav>
     <div className='Nav'>
    <NavLink className="btn btn-success" to="/">Home</NavLink>
     <NavLink className="btn btn-success" to="/tournaments">Tournaments</NavLink>
    </div>
    </nav>
  );
  }

export default Nav;
