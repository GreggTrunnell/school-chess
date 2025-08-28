import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Header from '../Header/Header';
import HomePage from '../HomePage/HomePage';
import Tournaments from '../Tournaments/Tournaments';
import LearningResources from '../LearningResources/LearningResources';

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
             <Route
            exact path="/learningResources"
            element={<LearningResources />}
          />
          <Route
            exact path="/about"
            element={
              <>
                <h2>About Page</h2>
                <p>
                  Come play some chess y'all!
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
