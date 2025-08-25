import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';


function Nav() {
  const user = useStore((store) => store.user);

  return (

  <nav>
    <div className="btn-group" role="group">
      { !user.id ? ( 
        // Guest access
        <>
          <NavLink className="btn btn-success" to="/login">Login</NavLink>
          <NavLink className="btn btn-secondary" to="/registration">Register</NavLink>
        </>
      ) : ( 
        // User access
        <>
          <NavLink className="btn btn-success" to="/">Home</NavLink>
          <NavLink className="btn btn-success" to="/find_a_friend">Find A Friend</NavLink>
          <NavLink className="btn btn-success" to="/friends_page">Friends</NavLink>
        </>
      )}
  
      {/* All access */}
      <NavLink className="btn btn-success" to="/about">About</NavLink>
    </div>
  </nav>
  );
}

export default Nav;
