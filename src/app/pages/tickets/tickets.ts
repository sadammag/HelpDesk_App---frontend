import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { TicketsListComponent } from '../../components/tickets-list/tickets-list.component.ts';
import { Ticket, TicketsService } from './tickets.service';
import { FormsModule } from '@angular/forms';
import { TicketsListComponent } from '../../components/tickets-list/tickets-list.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TicketsListComponent, FormsModule],
  templateUrl: './tickets.html',
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  error = '';

  // Для создания нового билета
  newTitle = '';
  newDescription = '';
  newStatus: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' = 'OPEN';
  newMessage: string = '';

  constructor(private ticketsService: TicketsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // Загрузка билетов
  loadTickets(): void {
    this.loading = true;
    this.error = '';

    this.ticketsService.getTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err.message || 'Ошибка при загрузке билетов';
        this.loading = false;
        this.tickets = [];

        this.cdr.detectChanges();
      },
    });
  }

  // Создание билета
  createTicket() {
    if (!this.newTitle.trim()) return;
    console.log(this.newTitle, this.newDescription, this.newStatus, `строка - ${this.newMessage}`);
    this.ticketsService
      .createTicket(this.newTitle, this.newDescription, this.newStatus, this.newMessage)
      .subscribe({
        next: (newTicket) => {
          this.newTitle = '';
          this.newDescription = '';
          this.newStatus = 'OPEN';
          this.newMessage = '';

          this.loadTickets();
        },

        error: (err) => console.error(err),
      });
  }

  // Обновление билета
  onUpdateTicket(updated: Partial<Ticket>) {
    console.log('Сработка метода - onUpdateTicket');
    this.ticketsService
      .editTicket(updated.id!, updated.title, updated.description, updated.status, updated.message)
      .subscribe({
        next: (updatedTicket) => {
          this.loadTickets();
        },

        error: (err) => console.error(err),
      });
  }

  // Удаление билета
  onDeleteTicket(ticketId: string) {
    this.ticketsService.deleteTicket(ticketId).subscribe({
      next: (success) => {
        if (success) {
          this.loadTickets();
        } else {
          console.error('Ошибка при удалении билета');
        }

        this.loadTickets();
      },
      error: (err) => console.error(err),
    });
  }
}
