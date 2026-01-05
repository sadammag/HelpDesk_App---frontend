import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../pages/tickets/tickets.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-list.html',
})
export class TicketsListComponent {
  @Input() tickets: Ticket[] = [];

  // События для родителя
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  editTicket(id: string) {
    this.edit.emit(id);
  }

  deleteTicket(id: string) {
    this.delete.emit(id);
  }
}
