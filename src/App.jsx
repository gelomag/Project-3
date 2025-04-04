import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Science from './components/Science'; 
import Categories from './components/Categories'; 
import FinalScore from './components/FinalScore';
import Bg from './assets/bg.jpg'; 

function App() {
  return (
    <Router>
      <div
        className="bg-fixed bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg})`, height: '100vh' }}
      >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/science" element={<Science />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/finalScore" element={<FinalScore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

