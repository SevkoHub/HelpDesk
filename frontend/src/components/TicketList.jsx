// src/components/TicketList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTickets, filterTickets } from '../services/TicketService';

const TicketList = ({reloadFlag}) => {
  const [tickets, setTickets] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });
  const navigate = useNavigate();

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

  
  const handleSort = (key) => {
  let direction = 'asc';
  if (sortConfig.key === key && sortConfig.direction === 'asc') {
    direction = 'desc';
  }
  setSortConfig({ key, direction });

  const priorityMap = { LOW: 1, MEDIUM: 2, HIGH: 3 };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (key === 'priority') {
      const priorityA = priorityMap[a[key]];
      const priorityB = priorityMap[b[key]];
      return direction === 'asc' ? priorityA - priorityB : priorityB - priorityA;
    }

    if (key === 'createdAt') {
      const dateA = new Date(a[key]);
      const dateB = new Date(b[key]);
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    }

    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  setTickets(sortedTickets);
};

  // Sıralama ok ikonu
  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return ' ↕️';
    }
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // Durum renk kodlaması
  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '12px'
    };

    switch (status) {
      case 'OPEN':
        return { ...baseStyle, backgroundColor: '#d4edda', color: '#155724' };
      case 'IN_PROGRESS':
        return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404' };
      case 'CLOSED':
        return { ...baseStyle, backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return baseStyle;
    }
  };

  // Öncelik renk kodlaması
  const getPriorityStyle = (priority) => {
    const baseStyle = {
      padding: '4px 8px',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '12px'
    };

    switch (priority) {
      case 'HIGH':
        return { ...baseStyle, backgroundColor: '#f8d7da', color: '#721c24' };
      case 'MEDIUM':
        return { ...baseStyle, backgroundColor: '#fff3cd', color: '#856404' };
      case 'LOW':
        return { ...baseStyle, backgroundColor: '#d1ecf1', color: '#0c5460' };
      default:
        return baseStyle;
    }
  };

  // Durum çevirisi
  const getStatusText = (status) => {
    switch (status) {
      case 'OPEN': return 'Açık';
      case 'IN_PROGRESS': return 'İşlemde';
      case 'CLOSED': return 'Kapalı';
      default: return status;
    }
  };

  // Öncelik çevirisi
  const getPriorityText = (priority) => {
    switch (priority) {
      case 'HIGH': return 'Yüksek';
      case 'MEDIUM': return 'Orta';
      case 'LOW': return 'Düşük';
      default: return priority;
    }
  };

  return (
    <div>
      <h2>Destek Talepleri Filtresi</h2>

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
            <th onClick={() => handleSort('title')} style={{ cursor: 'pointer' }}>
              Başlık{getSortIcon('title')}
            </th>
            <th>Açıklama</th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Durum{getSortIcon('status')}
            </th>
            <th onClick={() => handleSort('priority')} style={{ cursor: 'pointer' }}>
              Öncelik{getSortIcon('priority')}
            </th>
            <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
              Tarih{getSortIcon('createdAt')}
            </th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(ticket => (
            <tr key={ticket.id}>
              <td>{ticket.title}</td>
              <td>{ticket.description.length > 50 ? ticket.description.substring(0, 50) + '...' : ticket.description}</td>
              <td>
                <span style={getStatusStyle(ticket.status)}>
                  {getStatusText(ticket.status)}
                </span>
              </td>
              <td>
                <span style={getPriorityStyle(ticket.priority)}>
                  {getPriorityText(ticket.priority)}
                </span>
              </td>
              <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              <td>
                <button 
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                  style={{
                    backgroundColor: '#17a2b8',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}
                >
                  Detay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;