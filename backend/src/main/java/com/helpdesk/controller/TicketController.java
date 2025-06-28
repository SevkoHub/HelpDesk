package com.helpdesk.controller;

import com.helpdesk.model.Priority;
import com.helpdesk.model.Status;
import com.helpdesk.model.Ticket;
import com.helpdesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping //for listing tickets
    public List<Ticket> getAllTickets() {
        return ticketService.getAllTickets();
    }

    @GetMapping("/{id}")  // to read extra description
    public Optional<Ticket> getTicketById(@PathVariable Long id) {
        return ticketService.getTicketById(id);
    }

    @PostMapping // create a ticket
    public Ticket createTicket(@RequestBody Ticket ticket) {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/{id}")  //update patch
    public Ticket updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) {
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/{id}") // remove added but button doest not exist for now
    public void deleteTicket(@PathVariable Long id) {
        ticketService.deleteTicket(id);
    }

    @GetMapping("/filter")
    public List<Ticket> filterTickets(
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority
    ) {
        if (status != null && priority != null) {
            return ticketService.getByStatusAndPriority(status, priority);
        } else if (status != null) {
            return ticketService.getByStatus(status);
        } else if (priority != null) {
            return ticketService.getByPriority(priority);
        } else {
            return ticketService.getAllTickets();
        }
    }

}
