import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket, TicketLog } from '../../pages/tickets/tickets.service';
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
  //____________________________________________________________________
  // Для редактирования конкретного лога
  editingLogId: string | null = null;
  editedLog: Partial<TicketLog> = {};
  // Если нужно, можно хранить временные значения для всех логов билета
  editedLogs: { [ticketId: string]: TicketLog[] } = {};
  //____________________________________________________________________

  startEdit(ticket: Ticket) {
    this.editingTicketId = ticket.id;
    //this.editedTicket = { ...ticket };
    this.editedTicket = {
      ...ticket,
      logs: ticket.logs ? [...ticket.logs] : [],
    };
  }

  saveEdit() {
    if (this.editingTicketId) {
      this.update.emit({
        id: this.editingTicketId,
        ...this.editedTicket,
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

  autoResize(event: Event) {
    const el = event.target as HTMLTextAreaElement;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + 'px';
  }
}
