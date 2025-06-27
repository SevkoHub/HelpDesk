// src/components/TicketList.jsx
import React, { useEffect, useState } from 'react';
import { getTickets, filterTickets } from '../services/TicketService';

const TicketList = ({reloadFlag}) => {
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });

  const loadTickets = () => {
    if (filters.status || filters.priority) {
      filterTickets(filters.status, filters.priority)
        .then(res => setTickets(res.data))
        .catch(err => console.error(err));
    } else {
      getTickets()
        .then(res => setTickets(res.data))
        .catch(err => console.error(err));
    }
  };

  useEffect(() => {
  loadTickets();
}, [reloadFlag]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    loadTickets();
  };

  return (
    <div>
      <h2>Destek Talepleri</h2>

      {/* Filtre Formu */}
      <form onSubmit={handleFilterSubmit} style={{ marginBottom: '20px' }}>
        <label>
          Durum:
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Hepsi</option>
            <option value="OPEN">Açık</option>
            <option value="IN_PROGRESS">İşlemde</option>
            <option value="CLOSED">Kapalı</option>
          </select>
        </label>

        <label style={{ marginLeft: '10px' }}>
          Öncelik:
          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">Hepsi</option>
            <option value="LOW">Düşük</option>
            <option value="MEDIUM">Orta</option>
            <option value="HIGH">Yüksek</option>
          </select>
        </label>

        <button type="submit" style={{ marginLeft: '10px' }}>Filtrele</button>
      </form>

      {/* Liste */}
      <table>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Durum</th>
            <th>Öncelik</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.description}</td>
              <td>{ticket.status}</td>
              <td>{ticket.priority}</td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
