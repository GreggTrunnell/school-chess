import Nav from '../Nav/Nav';
import useStore from "../../zustand/store";

function Header() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <div className="Header">
      <h1 className="green-text">Racquets Not Paddles</h1>
      <h2 className="blue-text">Username: {user.username}</h2>
      <div>
        {
          // User is logged in, render these links:}
          user.id && (
            <>
              <button onClick={logOut}>Log Out</button>
            </>
          )
        }
      </div>
      <Nav />
    </div>
  );
}

export default Header;
