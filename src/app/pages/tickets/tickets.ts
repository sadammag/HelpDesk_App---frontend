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

    console.log('ВЫЗОВ ФУНКЦИИ   loadTickets()')

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


  onUpdateTicket(updated: Partial<Ticket>) {
    this.ticketsService
      .editTicket(updated.id!, updated.title, updated.description, updated.status)
      .subscribe({
        next: updatedTicket => {
          console.log(updatedTicket,'- обновленный билет')

           //this.tickets = this.tickets.map(t =>
           //t.id === updatedTicket.id ? updatedTicket : t);
          this.loadTickets();
    },
    
        error: err => console.error(err),
      });
  }


  onDeleteTicket(ticketId: string) {
    this.ticketsService.deleteTicket(ticketId).subscribe({
      next: success => {
        if (success) {
          this.loadTickets(); // После удаления сразу обновляем список с сервера
        } else {
          console.error('Ошибка при удалении билета');
        }

        this.loadTickets()
      },
      error: err => console.error(err),
    });
  }



}



