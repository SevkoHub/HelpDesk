package com.helpdesk.repository;

import com.helpdesk.model.Priority;
import com.helpdesk.model.Status;
import com.helpdesk.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket,Long> {
    List<Ticket> findByStatus(Status status);
    List<Ticket> findByPriority(Priority priority);
    List<Ticket> findByStatusAndPriority(Status status, Priority priority);

}
