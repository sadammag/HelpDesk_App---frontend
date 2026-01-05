import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../pages/tickets/tickets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets-list.html',
})

export class TicketsListComponent {
  @Input() tickets: Ticket[] = [];

  // События для родителя
  @Output() update = new EventEmitter<Ticket>();
  @Output() delete = new EventEmitter<string>();

  // Локальное состояние редактирования
  editingTicketId: string | null = null;
  editedTicket: Partial<Ticket> = {};


   startEdit(ticket: Ticket) {
    this.editingTicketId = ticket.id;
    this.editedTicket = { ...ticket };
  }

  saveEdit() {
    console.log('Сохранения сработка');
    if (this.editingTicketId) {
      this.update.emit({
        id: this.editingTicketId,
        ...this.editedTicket
      } as Ticket);
      this.editingTicketId = null;
      this.editedTicket = {};
    }
  }

  cancelEdit() {
    this.editingTicketId = null;
    this.editedTicket = {};
  }

  deleteTicket(id: string) {
    this.delete.emit(id);
  }
}
