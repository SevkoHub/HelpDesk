// src/components/TicketDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicketById, updateTicket } from '../services/TicketService';

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    status: '',
    priority: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTicket();
  }, [id]);

  const loadTicket = () => {
    getTicketById(id)
      .then(res => {
        setTicket(res.data);
        setEditForm({
          title: res.data.title,
          description: res.data.description,
          status: res.data.status,
          priority: res.data.priority
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Ticket bulunamadı');
        setLoading(false);
      });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    updateTicket(id, editForm)
      .then(res => {
        setTicket(res.data);
        setIsEditing(false);
        alert('Ticket başarıyla güncellendi!');
      })
      .catch(err => {
        console.error(err);
        alert('Güncelleme sırasında hata oluştu!');
      });
  };

  // Durum renk kodlaması
  const getStatusStyle = (status) => {
    const baseStyle = {
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '14px',
      display: 'inline-block'
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
      padding: '8px 16px',
      borderRadius: '6px',
      fontWeight: 'bold',
      fontSize: '14px',
      display: 'inline-block'
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

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!ticket) return <div>Ticket bulunamadı</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <button 
        onClick={() => navigate('/')}
        style={{
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Geri Dön
      </button>

      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>Ticket Detayı #{ticket.id}</h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              backgroundColor: isEditing ? '#dc3545' : '#28a745',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isEditing ? 'İptal' : 'Düzenle'}
          </button>
        </div>

        {isEditing ? (
          // Düzenleme Formu
          <form onSubmit={handleUpdateSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Başlık:</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleEditChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Açıklama:</label>
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleEditChange}
                rows="4"
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Durum:</label>
                <select
                  name="status"
                  value={editForm.status}
                  onChange={handleEditChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="OPEN">Açık</option>
                  <option value="IN_PROGRESS">İşlemde</option>
                  <option value="CLOSED">Kapalı</option>
                </select>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Öncelik:</label>
                <select
                  name="priority"
                  value={editForm.priority}
                  onChange={handleEditChange}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                  <option value="LOW">Düşük</option>
                  <option value="MEDIUM">Orta</option>
                  <option value="HIGH">Yüksek</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: '#2e86de',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Güncelle
            </button>
          </form>
        ) : (
          // Detay Görünümü
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Başlık</h3>
              <p style={{ fontSize: '18px', margin: 0 }}>{ticket.title}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Açıklama</h3>
              <p style={{ lineHeight: '1.6', margin: 0 }}>{ticket.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '30px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Durum</h3>
                <span style={getStatusStyle(ticket.status)}>
                  {getStatusText(ticket.status)}
                </span>
              </div>

              <div>
                <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Öncelik</h3>
                <span style={getPriorityStyle(ticket.priority)}>
                  {getPriorityText(ticket.priority)}
                </span>
              </div>
            </div>

            <div>
              <h3 style={{ color: '#2c3e50', marginBottom: '10px' }}>Oluşturulma Tarihi</h3>
              <p style={{ margin: 0 }}>{new Date(ticket.createdAt).toLocaleString('tr-TR')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetail;