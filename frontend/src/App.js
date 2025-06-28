// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetail from './components/TicketDetail';
import './App.css';

function App() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleTicketCreated = () => {
    setReloadFlag(prev => !prev); // değiştir, liste yenilensin
  };

  const HomePage = () => (
    <div className="App">
      <div className="top-section">
        <div className="form-container">
          <TicketForm onTicketCreated={handleTicketCreated} />
        </div>
        <div className="list-container">
          <TicketList reloadFlag={reloadFlag} />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ticket/:id" element={<TicketDetail />} />
      </Routes>
    </Router>
  );
}

export default App;