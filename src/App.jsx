import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from "react-router-dom";
import { Provider } from 'react-redux'
import { store } from '../src/store/store'
import HomePage from './pages/HomePage';
import PersonsPage from './pages/PersonsPage';
import CarsPage from './pages/CarsPage';
import PersonPage from './pages/PersonPage';
import CarPage from './pages/CarPage';


export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Главная</Link>
            </li>
            <li>
              <Link to="/persons">Персоны</Link>
            </li>
            <li>
              <Link to="/cars">Автомобили</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/persons" element={<PersonsPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="person/:id" element={<PersonPage />} />
          <Route path="car/:id" element={<CarPage />} />
        </Routes>
      </Router>
    </Provider>

  );
}
