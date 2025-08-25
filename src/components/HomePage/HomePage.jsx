import useStore from '../../zustand/store';
import { NavLink } from 'react-router-dom';
import RecipientRequests from '../RecipientRequests/RecipientRequests';

function HomePage() {
  const user = useStore((state) => state.user);

  return (
    <div>
      <RecipientRequests />
      <br />
      <img
        src="public/images/tennis_ball_guy.webp"
        style={{ width: "325px", height: "300px" }}
      />
      <h3>Player Profile:</h3>
      <div className="container mt-4">
        <div className="col-md-7 mb-7">
          <div
            className="card shadow-sm"
            style={{ backgroundColor: "#336c1f" }}
          >
            <div className="card-body">
              <h5 className="maroon-text">{user.username}</h5>
              <hr style={{ borderTop: "5px solid #800000" }} />
              <p className="card-text">
                <strong className="maroon-text">Email: </strong> {user.email}
                <br />
                <strong className="maroon-text">City: </strong> {user.city}
                <br />
                <strong className="maroon-text">Zip: </strong> {user.zip} <br />
                <strong className="maroon-text">Greeting: </strong>
                {user.greeting} <br />
                <strong className="maroon-text">Playing Hand: </strong>
                {user.playing_hand} <br />
                <strong className="maroon-text">Racquet Brand: </strong>
                {user.racquet_brand}
              </p>
              <div>
                <li>
                  <NavLink to="/UpdateProfile">Update Profile</NavLink>
                </li>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
