package com.helpdesk.service;

import com.helpdesk.model.Priority;
import com.helpdesk.model.Status;
import com.helpdesk.model.Ticket;
import com.helpdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    @Override
    public Optional<Ticket> getTicketById(Long id) {
        return ticketRepository.findById(id);
    }

    @Override
    public Ticket createTicket(Ticket ticket) {
        return ticketRepository.save(ticket);
    }

    @Override
    public Ticket updateTicket(Long id, Ticket updatedTicket) {
        return ticketRepository.findById(id).map(ticket -> {
            ticket.setTitle(updatedTicket.getTitle());
            ticket.setDescription(updatedTicket.getDescription());
            ticket.setStatus(updatedTicket.getStatus());
            ticket.setPriority(updatedTicket.getPriority());
            return ticketRepository.save(ticket);
        }).orElse(null);
    }

    @Override
    public void deleteTicket(Long id) {
        ticketRepository.deleteById(id);
    }
    @Override
    public List<Ticket> getByStatus(Status status) {
        return ticketRepository.findByStatus(status);
    }

    @Override
    public List<Ticket> getByPriority(Priority priority) {
        return ticketRepository.findByPriority(priority);
    }

    @Override
    public List<Ticket> getByStatusAndPriority(Status status, Priority priority) {
        return ticketRepository.findByStatusAndPriority(status, priority);
    }

}
