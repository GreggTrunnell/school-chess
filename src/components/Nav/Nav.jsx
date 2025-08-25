import { NavLink } from 'react-router-dom';

function Nav( ) {
  
  return (
    <nav>
     <div className='Nav'>
    <NavLink to="/">Home</NavLink>
     <NavLink to="/nav">Nav</NavLink>
    </div>
    </nav>
  );
  }

export default Nav;
