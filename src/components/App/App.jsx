import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import useStore from '../../zustand/store';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Header from '../Header/Header';
import UpdateProfile from '../UpdateProfile/UpdateProfile'
import FindAFriend from '../FindAFriend/FindAFriend';
import FriendsPage from '../FriendsPage/FriendsPage';

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <header>
        <Header />
      </header> 
      <main>
        <Routes>
          <Route 
            exact path="/"
            element={
              user.id ? (
                <HomePage /> // Render HomePage for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/find_a_friend"
            element={
              user.id ? (
                <FindAFriend to="/find_a_friend" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.

              )
            }
          />
          <Route 
            exact path="/friends_page"
            element={
              user.id ? (
                <FriendsPage to="/friends_page" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.

              )
            }
          />
          <Route 
            exact path="/UpdateProfile"
            element={
              user.id ? (
                <UpdateProfile to="/UpdateProfile" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.

              )
            }
          />
          <Route 
            exact path="/about"
            element={
              <>
                <h2>About Page</h2>
                <p>
                I started playing tennis about 13 years ago when my friend James randomly asked me if I wanted to play. 
                I had played a little bit of tennis as a kid and always liked it. I was never someone who enjoyed working 
                out, but I found tennis so fun that I fell in love with it.
                </p>
                <p>
                James and I continued to play, and it became our favorite pastime. More and more, however, public courts 
                were adding lighter lines for pickleball, which I found a little annoying. That’s why I created Racquets 
                Not Paddles—as a way to poke fun at pickleball and help others get into tennis.
                </p>
                <p>
                Just remember, promoting exercise is great, but pickles belong in a jar, not on a tennis court!
                </p>
              </>
            }
          />
          <Route
            path="*"
            element={
              <h2>404 Page</h2>
            } 
          />
        </Routes>
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}


export default App;
