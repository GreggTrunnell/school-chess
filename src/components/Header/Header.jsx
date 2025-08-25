import Nav from "../Nav/Nav";

function Header() {

  return (
    <div className='Header'>
      <div className="Header">
        <h1 className="green-text">School Chess Association</h1>
        <Nav />
        <img src="public/images/night_time_court.webp" style={{ width: "400px", height: "375px" }} />
      </div>
    </div>
  );
}

export default Header;
