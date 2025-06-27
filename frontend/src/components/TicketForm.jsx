// src/components/TicketForm.jsx
import React, { useState } from 'react';
import { createTicket } from '../services/TicketService';

const TicketForm = ({ onTicketCreated }) => {
  const [ticket, setTicket] = useState({
    title: '',
    description: '',
    status: 'OPEN',
    priority: 'LOW',
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTicket(ticket)
      .then(() => {
        alert('Ticket oluşturuldu!');
        if (onTicketCreated) {
          onTicketCreated(); // listeyi yenile
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Yeni Destek Talebi</h2>
      <input name="title" placeholder="Başlık" onChange={handleChange} required />
      <textarea name="description" placeholder="Açıklama" onChange={handleChange} required />
      <select name="status" onChange={handleChange}>
        <option value="OPEN">Açık</option>
        <option value="IN_PROGRESS">İşlemde</option>
        <option value="CLOSED">Kapalı</option>
      </select>
      <select name="priority" onChange={handleChange}>
        <option value="LOW">Düşük</option>
        <option value="MEDIUM">Orta</option>
        <option value="HIGH">Yüksek</option>
      </select>
      <button type="submit">Gönder</button>
    </form>
  );
};

export default TicketForm;
