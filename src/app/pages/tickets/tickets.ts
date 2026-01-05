// import { Component, signal } from '@angular/core';
// import { TicketsService, Ticket } from './tickets.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-tickets',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './tickets.html',
//   styleUrls: ['./tickets.css'],
// })
// export class TicketsComponent {
//   tickets: Ticket[] = [];
//   loading = signal(false);
//   error = signal('');

//   constructor(private ticketsService: TicketsService) {
//     this.loadTickets();
//   }

//   loadTickets() {
//     this.loading.set(true);
//     this.error.set('');

//     this.ticketsService.getTickets().subscribe({
//       next: (tickets) => {
//         this.tickets = tickets;
//         this.loading.set(false);
//       },
//       error: (err) => {
//         this.error.set(err.message || 'Ошибка при загрузке билетов');
//         this.tickets = [];
//         this.loading.set(false);
//       },
//     });
//   }
// }

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsListComponent } from '../../components/tickets-list/tickets-list.component.ts';
import { Ticket, TicketsService } from './tickets.service';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [CommonModule, TicketsListComponent],
  templateUrl: './tickets.html',
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  loading = true;
  error = '';

  constructor(
    private ticketsService: TicketsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.loading = true;
    this.error = '';

    this.ticketsService.getTickets().subscribe({
      next: tickets => {
        this.tickets = tickets;
        this.loading = false;

        this.cdr.detectChanges();
      },
      error: err => {
        this.error = err.message || 'Ошибка при загрузке билетов';
        this.loading = false;
        this.tickets = [];

        this.cdr.detectChanges();
      },
    });
  }


//   onEditTicket(ticketId: string) {
//   this.ticketsService.editTicket(ticketId, { title: 'Новое название' }).subscribe({
//     next: updatedTicket => {
//       // Обновляем локальный массив
//       const index = this.tickets.findIndex(t => t.id === ticketId);
//       if (index !== -1) this.tickets[index] = updatedTicket;
//     },
//     error: err => console.error(err),
//   });
// }

onDeleteTicket(ticketId: string) {
  this.ticketsService.deleteTicket(ticketId).subscribe({
    next: success => {
      if (success) {

        this.loadTickets(); // После удаления сразу обновляем список с сервера
      } else {
        console.error('Ошибка при удалении билета');
      }
    },
    error: err => console.error(err),
  });
}



}



