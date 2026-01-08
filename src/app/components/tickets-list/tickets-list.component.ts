import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket, TicketLog } from '../../pages/tickets/tickets.service';
import { FormsModule } from '@angular/forms';

interface EditableTicket extends Partial<Ticket> {
  message?: string;
}

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tickets-list.html',
})
export class TicketsListComponent {
  @Input() tickets: Ticket[] = [];

  @Output() update = new EventEmitter<EditableTicket>();
  @Output() delete = new EventEmitter<string>();

  // Локальное состояние редактирования
  editingTicketId: string | null = null;
  editedTicket: EditableTicket = {};
  editingLogId: string | null = null;
  editedLog: Partial<TicketLog> = {};

  startEdit(ticket: Ticket) {
    this.editingTicketId = ticket.id;
    this.editedTicket = {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      message: ticket.logs?.[0]?.message ?? '',
    };
  }

  saveEdit() {
    console.log('Что хранится в this.editedTicket - ', this.editedTicket);
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

  hasLogs(ticket: Ticket): boolean {
    return !!ticket.logs?.some((log) => log.message && log.message.trim() !== '');
  }
}
