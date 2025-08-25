import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Tournaments from '../Tournaments/Tournaments';

function App() {

  return (
    <>
      <header>
     <Header />
      </header>
      <main>
        <Routes>
          <Route
          exact path="/"
          element={<HomePage />}
        />
            <Route
          exact path="/tournaments"
          element={<Tournaments />}
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
