package com.helpdesk.service;

import com.helpdesk.model.Priority;
import com.helpdesk.model.Status;
import com.helpdesk.model.Ticket;
import java.util.List;
import java.util.Optional;

public interface TicketService {
    List<Ticket> getAllTickets();
    Optional<Ticket> getTicketById(Long id);
    Ticket createTicket(Ticket ticket);
    Ticket updateTicket(Long id, Ticket ticket);
    void deleteTicket(Long id);
    List<Ticket> getByPriority(Priority priority);
    List<Ticket> getByStatusAndPriority(Status status, Priority priority);
    List<Ticket> getByStatus(Status status);
}
