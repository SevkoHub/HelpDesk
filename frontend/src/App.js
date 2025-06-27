// src/App.js
import React, { useState } from 'react';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';

function App() {
  const [reloadFlag, setReloadFlag] = useState(false);

  const handleTicketCreated = () => {
    setReloadFlag(prev => !prev); // değiştir, liste yenilensin
  };

  return (
    <div className="App">
      <TicketForm onTicketCreated={handleTicketCreated} />
      <hr />
      <TicketList reloadFlag={reloadFlag} />
    </div>
  );
}

export default App;
