import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ticket } from '../../pages/tickets/tickets.service';
//import { Ticket } from '../../services/tickets.service';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tickets-list.html',
})
export class TicketsListComponent {
  @Input() tickets: Ticket[] = [];
}
