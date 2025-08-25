import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import HomePage from '../HomePage/HomePage';
import Nav from '../Nav/Nav';

function App() {

  return (
    <>
      <header>
        <div className="Header">
          <h1 className="green-text">School Chess Association</h1>
          <img src="public/images/night_time_court.webp" style={{ width: "400px", height: "375px" }} />
        </div>
      </header>
      <main>
        <Routes>
          <Route
          exact path="/"
          element={<HomePage />}
        />
        </Routes>
         <Nav />
      </main>
      <footer>
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}


export default App;
