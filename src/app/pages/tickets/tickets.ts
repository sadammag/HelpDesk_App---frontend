import { Component, signal } from '@angular/core';
import { TicketsService, Ticket } from './tickets.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets.html',
  styleUrls: ['./tickets.css'],
})
export class TicketsComponent {
  tickets: Ticket[] = [];
  loading = signal(false);
  error = signal('');

  constructor(private ticketsService: TicketsService) {
    this.loadTickets();
  }

  loadTickets() {
    this.loading.set(true);
    this.error.set('');

    this.ticketsService.getTickets().subscribe({
      next: (tickets) => {
        this.tickets = tickets;
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Ошибка при загрузке билетов');
        this.tickets = [];
        this.loading.set(false);
      },
    });
  }
}
