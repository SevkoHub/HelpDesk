// src/services/ticketService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/tickets';

export const getTickets = () => axios.get(BASE_URL);
export const createTicket = (ticket) => axios.post(BASE_URL, ticket);
export const getTicketById = (id) => axios.get(`${BASE_URL}/${id}`);
export const updateTicket = (id, ticket) => axios.put(`${BASE_URL}/${id}`, ticket);
export const filterTickets = (status, priority) => {
  let url = `${BASE_URL}/filter`;
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (priority) params.append("priority", priority);
  url += `?${params.toString()}`;
  return axios.get(url);
};